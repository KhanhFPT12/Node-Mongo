const express = require("express");
const { engine } = require("express-handlebars");

const app = express();

// cấu hình handlebars
app.engine(
  "handlebars",
  engine({
    helpers: {
      formatDate: (date) => {
        return new Date(date).toLocaleDateString();
      }
    }
  })
);

app.set("view engine", "handlebars");
app.set("views", "./views");

// route test
app.get("/", (req, res) => {
  res.render("home", {
    title: "main",
    message: "Home",
    articles
  });
});

// fake data 
const articles = [
  {
    id: 1,
    title: "Node.js is awesome",
    author: "John Doe",
    date: new Date("2024-01-01"),
    content: "Node.js allows you to build fast servers."
  },
  {
    id: 2,
    title: "Handlebars Tutorial",
    author: "Jane Smith",
    date: new Date("2024-02-15"),
    content: "Handlebars makes templating easy."
  }
];


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


