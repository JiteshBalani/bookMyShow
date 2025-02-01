const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If you're using cookies/sessions
}));
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

const dbURL = "mongodb+srv://Jitesh:ilfcbFmBXsLrzDkD@cluster0.ezae6pw.mongodb.net/BookMyShow?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURL).then( () => {
    try{
        console.log("Connection to database successful!");
    }catch(err) {
        console.log(err);
    }
});

app.listen(3000, ()=>{
    try{
        console.log('Server is connected.');
    } catch(err) {
        console.log(err);
    }
});