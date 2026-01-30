module.exports = function validateArticle(req, res, next) {
  const { title, content, date } = req.body;

  if (!title || !content || !date) {
    return res.status(400).json({ message: "title, content, date are required" });
  }
  next();
};
