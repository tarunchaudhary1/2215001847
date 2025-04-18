const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  commentCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Post', postSchema);