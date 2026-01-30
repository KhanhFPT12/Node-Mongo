const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB(mongoURL) {
    await mongoose.connect(mongoURL);
    console.log('Database connected successfully' , mongoURL);
  

}
module.exports = connectDB; // xuat ham connectDB de su dung o file khac