const mongoose = require("mongoose");
const Post = require("../models/Post");
const { validationResult } = require("express-validator");

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log(req.body);
      const post = await new Post(req.body);
      await post.save();
      if (!res.headersSent) { // Check if the response has already been sent
        res.status(201).json(post); // Send the new post object as response
        res.send("new post successfully added");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
      // res.status(500).json({ message: 'Erreur lors de la création du post' });
    }
  },

  async findOnePost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findOne({ _id: req.params.id });
      res.send(post);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  },
  //findByIdAndUpdate
  async findOnePostAndUpdate(req, res) {
    try {
      const query = { _id: req.params.id };
      const update = req.body;
      console.log(req.body);
      const post = await Post.findByIdAndUpdate(query, update);

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
