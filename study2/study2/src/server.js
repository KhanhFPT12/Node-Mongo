const express = require('express');
const app = require('./app');
const connectDB = require('./config/db');
const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME || 'localhost';
const mongoUrl =process.env.MONGO_URL || 'mongodb://localhost:27017/study2';

const strart = async () => {
    try {
        // connect db
        await connectDB(mongoUrl);
        console.log('Connected to MongoDB');    
        app.listen(port, hostname, () => {
            console.log(`Server is running on http://${hostname}:${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

strart();