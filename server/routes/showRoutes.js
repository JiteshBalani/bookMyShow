const express = require('express');
const router = express.Router();
const Show = require('../models/showModel');
const Theatre = require('../models/theatreModel');

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

//add a show by movieID
router.post('/add-show-by-movie/:_id', async(req, res) => {
    try {
        if (!req.params._id) {
            return res.status(400).send({
                success: false,
                message: 'Movie ID is required'
            });
        }

        const showData = {
            ...req.body,
            movie: req.params._id // Ensure movie ID is properly set
        };

        // Log the data being saved
        console.log('Saving show data:', showData);

        const show = new Show(showData);
        await show.save();
        
        res.send({
            success: true,
            message: 'New show added!'
        });
    } catch(error) {
        console.error('Error adding show:', error);
        res.status(500).send({
            success: false,
            message: `Error adding new show! ${error.message}`
        });
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
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        const shows = await Show.find({movie, date: {$gte: startDate, $lt: endDate}}).populate('theatre');
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

//get show by id
router.post('/get-show-by-id',  async (req, res) => {
    try{
        const show = await Show.findById(req.body.showId).populate('movie').populate('theatre');
        res.send({
            success: true,
            message: 'Show fetched!',
            data: show
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;