const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

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