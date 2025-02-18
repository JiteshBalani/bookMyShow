const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
require('dotenv').config();

router.post('/register', async(req, res) => {
    try{
        const userExists = await User.findOne({ email: req.body.email});

        if(userExists) {
            res.send({
                success: false,
                message: "User already registered."
            })
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPass;

        const newUser = await User(req.body);
        await newUser.save();

        const token = jwt.sign({userId: newUser._id}, process.env.SECRET_KEY, {expiresIn: "1d"})

        res.send({
            success: true,
            message: 'Registration successful!',
            token: token
        });

    }catch(err){
        console.log(err);

        res.send({
            success: false,
            message: err
        });

    };
});

router.post('/login', async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            res.send({
                success: false,
                message: "User does not exists."
            })
        }

        const validPass = await bcrypt.compare(req.body.password, user.password);

        if(!validPass) {
            res.send({
                success: false,
                message: "Invalid Password"
            })
            return;
        }

        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: "1d"})

        res.send({
            status: true,
            message: "Logged in successfully!",
            token: token
        })

    }catch(err){
        console.log(err);
    };
});

router.post('/reset-password', async(req, res) => {
    try {
        // Assuming req.body contains email and new password
        const { email, newPassword } = req.body;
        
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Basic password validation
        if (!newPassword || newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.get('/get-current-user',  authMiddleware, async (req, res) => {
    // inform the server if the token is valid or not and who the user is
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "You are authorized",
      data: user
    });
    
  })

module.exports = router;
