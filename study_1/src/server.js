require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const User = require('./models/Users');

const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || 'localhost';
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/connect';

// middleware để nhận JSON/form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello Worlddd!'));
app.get('/about', (req, res) => res.send('About Us'));
app.get('/samples', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/view/samples.html'))
);

// CREATE: thêm user mới
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const user = await User.create({ name, email, age });
    return res.status(201).json({ message: 'created', data: user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    return res.status(400).json({ message: err.message });
  }
});

// READ: lấy danh sách user
app.get('/api/users', async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

async function start() {
  try {
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connected:', mongoUrl);

    app.listen(port, hostname, () => {
      console.log(`Server is running at http://${hostname}:${port}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connect error:', err.message);
    process.exit(1);
  }
}

start();
