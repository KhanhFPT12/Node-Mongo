const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articleRouter');


const app = express();
const Article = require('./models/article');

// ket noi MongoDB
mongoose.connect('mongodb://localhost/my_database')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));


console.log('Connected to MongoDB');

//middleware de parse JSON
app.use(express.json());

// test insert article
const article = new Article({
    title: 'My First Article',
    body: 'This is the body of my first article.',
    numberOfLikes: 10
});
article.save().then(() => {
    console.log('Article saved successfully');
}).catch(err => {
    console.error('Error saving article:', err);
});

app.use('/articles', articleRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});