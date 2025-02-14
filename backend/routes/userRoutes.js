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