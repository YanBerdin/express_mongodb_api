const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  author: { type: String, required: true },
});

PostSchema.methods.toLocaleString = function () {
  return this.created_at.toLocaleString();
};

module.exports = mongoose.model("Post", PostSchema);
