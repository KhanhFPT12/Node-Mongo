const express = require("express");
const router = express.Router();

let articles = require("../articles");

const validateArticle = require("../middlewares/validateArticle");
const validateDate = require("../middlewares/validateDate");
const validateLength = require("../middlewares/validateLength");

router.get("/", (req, res) => res.json(articles));

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = articles.find(a => a.id === id);
  if (!found) return res.status(404).json({ message: "Article not found" });
  res.json(found);
});

// ✅ POST dùng middleware
router.post(
  "/",
  validateArticle,
  validateDate("date"),
  validateLength("title", 3, 100),
  (req, res, next) => {
    try {
      const { title, content, date } = req.body;
      const newId = articles.length ? Math.max(...articles.map(a => a.id)) + 1 : 1;
      const newArticle = { id: newId, title, content, date };
      articles.push(newArticle);
      res.status(201).json(newArticle);
    } catch (err) {
      next(err); // ✅ bài 8
    }
  }
);

// ✅ PUT cũng dùng middleware (không bắt buộc validateArticle đầy đủ, nhưng làm vậy cho chặt)
router.put(
  "/:id",
  validateDate("date"),
  validateLength("title", 3, 100),
  (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const idx = articles.findIndex(a => a.id === id);
      if (idx === -1) return res.status(404).json({ message: "Article not found" });

      articles[idx] = { ...articles[idx], ...req.body, id };
      res.json(articles[idx]);
    } catch (err) {
      next(err); // ✅ bài 8
    }
  }
);

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = articles.length;
  articles = articles.filter(a => a.id !== id);
  if (articles.length === before) return res.status(404).json({ message: "Article not found" });
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
