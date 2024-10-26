const mongoose = require("mongoose");
const Post = require("../models/Post");

module.exports = {
  async findPosts(req, res) {
    try {
      const posts = await Post.find({});
      res.send(posts);
    } catch (error) {
      res.send(error);
    }
  },
  async createPost(req, res) {
    try {
      console.log(req.body);
      const post = await new Post(req.body);
      await post.save();
      res.send("new post successfully added");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  async findOnePost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      res.send(post);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  },
  async findOnePostAndUpdate(req, res) {
    try {
      const query = { _id: req.params.id };
      const update = req.body;
      console.log(req.body);
      const post = await Post.findOneAndUpdate(query, update);

      await post.save();
      res.send("new post successfully edited");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
  async findOnePostAndDelete(req, res) {
    try {
      const query = { _id: req.params.id };
      await Post.findOneAndDelete(query);
      res.send("new post successfully deleted");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};
