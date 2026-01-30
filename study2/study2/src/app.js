const express = require('express');
const path = require('path');

const userRouter = require('./routes/UserRouter');

const app = express();

// middleware doc body dang json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test router
app.get('/', (req, res) => {
    res.send('Hello Node!');
});

app.use('/api', userRouter);
module.exports = app;