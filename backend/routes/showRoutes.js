const express = require('express');
const router = express.Router();
const Show = require('../models/showModel');

router.post('/add-show', async(req, res) => {
    try{
        const show = new Show(req.body);
        await show.save();
        res.send({
            success: true,
            message: "New show added!"
        })
    } catch(error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

module.exports = router