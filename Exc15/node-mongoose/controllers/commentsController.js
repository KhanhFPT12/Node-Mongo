const Comment = require("../models/comment");
const Article = require("../models/article");

// CREATE comment
exports.createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const savedComment = await comment.save();

    await Article.findByIdAndUpdate(
      savedComment.article,
      { $push: { comments: savedComment._id } }
    );

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET comments + populate article
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("article");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
