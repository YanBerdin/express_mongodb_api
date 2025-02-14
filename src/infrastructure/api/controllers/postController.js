const mongoose = require("mongoose");
const Post = require("../../../core/entities/Post");
const { validationResult } = require("express-validator");

module.exports = {

  async findPosts(req, res) {
    // console.log(">> GET /posts");
    try {
      const posts = await Post.find({});
      res.send(posts);
    } catch (error) {
      res.send(error);
    }
  },

  async createPost(req, res) {
    console.log(">> POST /posts/create", req.params.id); //TODO: Remove this line
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log(req.body); //TODO: Remove this line
      const post = await new Post(req.body);
      await post.save();
      res.status(201).json(post); // Send the new post object as response
    } catch (error) {
      console.log(error); //TODO: Remove this line
      res.status(500).json({ message: "Erreur lors de la création du post" });
    }
  },

  async findOnePost(req, res) {
    console.log(">> GET /posts/:id", req.params.id); //TODO: Remove this line
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findOne({ _id: req.params.id });
      //console.log(">> GET /posts/:id", req.params.id);
      res.send(post);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  },

  async findOnePostAndUpdate(req, res) {
    console.log(">> PATCH /posts/update/:id", req.params.id); //TODO: Remove this line
    console.log(
      "findOnePostAndUpdate : ObjectId valide ?",
      mongoose.Types.ObjectId.isValid(req.params.id)
    ); //TODO: Remove this line
    try {
      const query = { _id: req.params.id };

      const update = req.body;
      console.log(req.body); //TODO: Remove this line

      const post = await Post.findByIdAndUpdate(query, update);

      await post.save();

      res.send("new post successfully edited");
    } catch (error) {
      console.log(error); //TODO: Remove this line
      res.send(error);
    }
  },

  async findOnePostAndDelete(req, res) {
    console.log(">> DELETE /posts/delete/:id", req.params.id); //TODO: Remove this line
    console.log(
      "Est-ce un ObjectId valide ?",
      mongoose.Types.ObjectId.isValid(req.params.id)
    ); // TODO: Remove this line
    try {
      const query = { _id: req.params.id };

      const deletedPost = await Post.findOneAndDelete(query);

      if (!deletedPost) {
        return res.status(404).json({ message: "Post introuvable" });
      }

      return res.status(200).json({ message: "Post supprimé avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      return res.status(500).json({ message: "Erreur serveur", error });
    }
  },
};
