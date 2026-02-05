const express = require('express');
const mongoose = require('mongoose');
const Article = require("./models/article");

const articleRouter = require('./routes/articleRouter');
const commentRouter = require("./routes/commentRouter");
const exphbs = require("express-handlebars");

const app = express();

// Middleware parse JSON
app.use(express.json());

// cấu hình Handlebars
app.engine(
  "handlebars",
  exphbs.engine({
    partialsDir: "views/partials/",
    helpers: {
      formatDate: function (date) {
        return new Date(date).toLocaleDateString("vi-VN");
      }
    }
  })
);

app.set("view engine", "handlebars");

// route test
app.get("/", async (req, res) => {
  try {
    const articles = await Article.find().lean();
    res.render("home", {
      title: "Hello",
      message: "Hello, World!", 
      articles: articles
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching articles");
  }
});


// Kết nối MongoDB
mongoose.connect('mongodb://localhost/my_database')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));




// Routes
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);

//
app.get("/articles/:id", async (req, res) => {
  try {
    const article = await Article
      .findById(req.params.id)
      .populate("comments")
      .lean();

    if (!article) {
      return res.status(404).send("Article not found");
    }

    res.render("article", {
      title: article.title,
      article
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});