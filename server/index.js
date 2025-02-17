const dotenv = require('dotenv');

// Default to production unless a specific flag is provided
const envFile = process.argv.includes('--dev') ? '.env.development' : '.env.production';
dotenv.config({ path: envFile });

// console.log(`Loaded environment file: ${envFile}`);
// console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());

let frontendURL = process.env.FRONTEND_URL
console.log(frontendURL);

app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If you're using cookies/sessions
}));

app.options('*', cors());

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

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    try{
        console.log('Server is running on', PORT);
    } catch(err) {
        console.log(err);
    }
});