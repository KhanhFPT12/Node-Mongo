const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// middelware
app.use(express.json());

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// database connection
mongoose.connect('mongodb://localhost:27017/carRental') ;
console.log('Connected to MongoDB');

app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/cars", require("./routes/carRoutes"));
  
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});