const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Article title is required'],
    minlength: [5, 'Title must be at least 5 characters long'],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Article Date is required"]

  },
  text: {
    type: String,
    required: [true, "Article text is required"],
    validate: {
      validator: function (v) {
        return v && v.length >= 20;
      },
      message: 'Article text must be at least 20 characters long'
    }
  },
  tags: {
    type: [String],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'There must be at least one tag'
    }
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

module.exports = mongoose.model("Article", ArticleSchema);
