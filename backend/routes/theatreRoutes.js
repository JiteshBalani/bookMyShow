const express = require('express');
const router = express.Router();
const Theatre = require('../models/theatreModel');

//add new theatre
router.post('/add-theatre', async(req, res) => {
    try{
        const theatre = new Theatre(req.body);
        await theatre.save();
        res.send({
            success: true,
            message: 'New theatre added!'
        })
    } catch(error) {
        res.send({
            success: false,     
            message: error.message
        })    
    }
});

//get all theatres
router.get('/get-all-theatres', async(res) => {
    try{
        const allTheatres = await Theatre.find().populate('owner');
        res.send({
            success: true,
            message: 'All theatres',
            data: allTheatres
        })
    } catch(error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

router.delete('/delete-theatre', async(req, res) => {
    try{
        await Theatre.findByIdAndDelete(req.body.theatreId);
        res.send({
            success: true,
            message: 'Theatre deleted successfully!',
        })
    } catch(error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

//update theatre info
router.put('/update-theatre', async(req, res) => {
    try{
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        res.send({
            success: true,
            message: 'Theatre updated successfully!',
        })
    } catch(error){
        res.send({
            success: false,
            message: error.message
        })
    }
});

//find theatres by owners
router.get('/get-theatres-by-owner', async(req, res) => {
    try{
        const theatres = await Theatre.find({owner: req.body.owner}).populate('owner');
        res.send({
            success: true,
            message: 'Theatres fetched successfully!',
            data: theatres
        })
    } catch(error) {
        res.send({
            success: false, 
            message: error.message
        })
    }
})

module.exports = router