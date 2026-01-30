const User = require('../models/User');

const createUser = async (req, res) => { 
    try {
        const { name, email, age , sex , adress } = req.body;
        const user = await User.create({ name, email, age, sex, adress });
        const save = res.status(201).json({message: 'User created successfully !!', user});
        return save;
    }catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        return res.status(400).json({ message: err.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({createdAt: -1});
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { createUser, getAllUsers };