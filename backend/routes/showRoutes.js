const express = require('express');
const router = express.Router();
const Show = require('../models/showModel');

router.post('/add-show', async (req, res) => {
    try {
        const show = new Show(req.body);
        await show.save();
        res.send({
            success: true,
            message: "New show added!"
        })
    } catch (error) {
        res.send({
            success: false,
            message: `Error adding new show! ${error.message}`
        })
    }
});

//list all shows by theatre
router.get('/all-shows-by-theatre/:_id', async(req, res) => {
    try {
        const shows = await Show.find({ theatre: req.params._id })
                    .populate([{ path: 'movie' }, { path: 'theatre' }]);

        res.send({
            success: true,
            message: 'These are the list of shows available for the theatre selected.',
            data: shows
        })
    } catch(error) {
        res.send({
            success: false,
            message: `Error fetching shows for the theatre selected., ${error.message}`
        })
    }
});

//update the show by id
router.put('/update-show/:_id', async(req, res) => {
    try{
        await Show.findByIdAndUpdate(req.params._id, req.body);
        res.send({
            success: true,
            message: "Show is updated with provided changes."
        })
    } catch(error) {
        res.send({
            success: false,
            message: `Error updating the changes!, ${error.message}`
        })
    }
});

//get all theatres by a movie
router.get('/get-all-theatres-for-movie/:movie', async(req, res) => {
    try{
        const {movie} = req.params;
        const {date} = req.query;
        const shows = await Show.find({movie, date}).populate('theatre');
        // format the data 
        let uniqueTheatres = [];
        shows.forEach(show => {
            let isTheatre = uniqueTheatres.find(theatre => theatre._id === show.theatre._id);
            if(!isTheatre){
                let showsOfThisTheatre = shows.filter(showObj => showObj.theatre._id == show.theatre._id);
                uniqueTheatres.push({...show.theatre._doc, shows: showsOfThisTheatre});
            }
        });
        res.send({
            success: true,
            message: 'Shows by theatre',
            data: uniqueTheatres
        })
    } catch(error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

module.exports = router;