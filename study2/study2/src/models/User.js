const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, required: false },
        sex : { type: String, required: false  },
        adress : { type: String, required: false  },
        
    },
    { timestamps: true }
)
module.exports = mongoose.model('User', userSchema); // xuat model User de su dung o file khac