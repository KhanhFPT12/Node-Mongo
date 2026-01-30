const express = require("express");
const router = express.Router();

let videos = require("../videos");

router.get("/", (req, res) => res.json(videos));

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = videos.find(v => v.id === id);
  if (!found) return res.status(404).json({ message: "Video not found" });
  res.json(found);
});

router.post("/", (req, res) => {
  const { title, url, date } = req.body;
  const newId = videos.length ? Math.max(...videos.map(v => v.id)) + 1 : 1;
  const newVideo = { id: newId, title, url, date };
  videos.push(newVideo);
  res.status(201).json(newVideo);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = videos.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).json({ message: "Video not found" });

  videos[idx] = { ...videos[idx], ...req.body, id };
  res.json(videos[idx]);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = videos.length;
  videos = videos.filter(v => v.id !== id);
  if (videos.length === before) return res.status(404).json({ message: "Video not found" });
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
