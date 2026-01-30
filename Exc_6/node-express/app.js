const express = require("express");
const app = express();
app.use(express.json());

let articles = require("./articles");
let videos = require("./videos");

const articleRouter = require("./routers/articleRouter");
const videoRouter = require("./routers/videoRouter");

// ===== ARTICLES =====

// GET all
app.get("/articles", (req, res) => res.json(articles));

// GET by id
app.get("/articles/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = articles.find(a => a.id === id);
  if (!found) return res.status(404).json({ message: "Article not found" });
  res.json(found);
});

// POST create
app.post("/articles", (req, res) => {
  const { title, content, date } = req.body;
  const newId = articles.length ? Math.max(...articles.map(a => a.id)) + 1 : 1;
  const newArticle = { id: newId, title, content, date };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

// PUT update
app.put("/articles/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = articles.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ message: "Article not found" });

  articles[idx] = { ...articles[idx], ...req.body, id };
  res.json(articles[idx]);
});

// DELETE
app.delete("/articles/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = articles.length;
  articles = articles.filter(a => a.id !== id);
  if (articles.length === before) return res.status(404).json({ message: "Article not found" });
  res.json({ message: "Deleted successfully" });
});

// ===== VIDEOS =====

app.get("/videos", (req, res) => res.json(videos));

app.get("/videos/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = videos.find(v => v.id === id);
  if (!found) return res.status(404).json({ message: "Video not found" });
  res.json(found);
});

app.post("/videos", (req, res) => {
  const { title, url, date } = req.body;
  const newId = videos.length ? Math.max(...videos.map(v => v.id)) + 1 : 1;
  const newVideo = { id: newId, title, url, date };
  videos.push(newVideo);
  res.status(201).json(newVideo);
});

app.put("/videos/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = videos.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).json({ message: "Video not found" });

  videos[idx] = { ...videos[idx], ...req.body, id };
  res.json(videos[idx]);
});

app.delete("/videos/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = videos.length;
  videos = videos.filter(v => v.id !== id);
  if (videos.length === before) return res.status(404).json({ message: "Video not found" });
  res.json({ message: "Deleted successfully" });
});
app.use("/articles", articleRouter);
app.use("/videos", videoRouter);

app.listen(3000, () => console.log("Server running: http://localhost:3000"));



