const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

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

        res.send({
            success: true,
            message: 'Registration successful!'
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

        res.send({
            status: true,
            message: "Logged in successfully!"
        })

    }catch(err){
        console.log(err);
    };
});

module.exports = router;