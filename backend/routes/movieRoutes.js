const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');

//Add movie
router.post('/add-movie', async(req, res) => {
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

//get all movies
router.get('/get-all-movies', async(req, res) => {
    try{
        const allMovies = await Movie.find();
        res.send({
            success: true,
            message: 'All Movies',
            data: allMovies
        })
    } catch(error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

//update a movie
router.put('/update-movie/:_id', async(req, res) => {
    try{
        const movie = await Movie.findByIdAndUpdate(req.params._id, req.body);
        const updatedMovie = await Movie.findById(req.params._id);
        res.send({
            success: true,
            message: 'Movie updated successfully!',
            data: updatedMovie
        })
    } catch(error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

//delete a movie
router.delete('/delete-movie/:_id', async(req, res) => {
    try{
        await Movie.findByIdAndDelete(req.params._id);
        res.send({
            success: true,
            message: 'Movie deleted successfully!',
        })
    } catch(error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

//fetch a single movie 
router.get('/get-movie/:id', async(req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        res.send({
            success: true,
            message: 'Movie fetched successfully!',
            data: movie
        })
    } catch(error) {
        res.send({
            success: false, 
            message: error.message
        })
    }
})

module.exports = router;

