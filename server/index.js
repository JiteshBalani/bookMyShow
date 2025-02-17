if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
} else {
    require('dotenv').config({ path: '.env.production' });
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
// require('dotenv').config();

const app = express();
app.use(express.json());

let frontendURL = process.env.FRONTEND_URL
console.log(frontendURL);
app.use(cors({
    origin: frontendURL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If you're using cookies/sessions
}));
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);

const dbURL = process.env.DB_URL;

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