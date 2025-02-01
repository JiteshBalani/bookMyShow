const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');

//add a movie
//get all movies to list it somewhere
//update a movie
//delete a movie
//fetch a single movie using id

router.post('/add-movie', async (req, res) => {
    try{
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: 'New movie added!'
        })
    } catch(error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

module.exports = router;

