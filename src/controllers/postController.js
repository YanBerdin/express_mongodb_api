const mongoose = require("mongoose");
const Post = require("../models/Post");
const { validationResult } = require("express-validator");

module.exports = {
  /**
   * @route GET /posts
   * @summary Returns a list of posts
   * @tags Posts
   * @returns {Array<Post>} 200 - Success response with an array of posts
   */
  async findPosts(req, res) {
    // console.log(">> GET /posts");
    try {
      const posts = await Post.find({});
      res.send(posts);
    } catch (error) {
      res.send(error);
    }
  },

  /**
   * @route POST /posts/create
   * @summary Create a new post
   * @tags Posts
   * @returns {Post} 201 - New post object
   */
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

  /**
   * @route GET /posts/{id}
   * @summary Returns a post by ID
   * @tags Posts
   * @param {string} id.path.required - ID param
   * @returns {Post} 200 - Post details
   * @returns {object} 404 - Post not found
   */
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

  /**
   * @route PATCH /posts/update/{id}
   * @summary Update an existing post by Id
   * @tags Posts
   * @security BearerAuth
   * @param {string} id.path.required - The unique ID of the post to be updated
   * @param {Post} request.body.required - Post information
   * @returns {Post} 200 - Post updated successfully
   * @returns {object} 400 - Validation error
   * @returns {object} 401 - Unauthorized
   * @returns {object} 403 - Forbidden
   * @returns {object} 404 - Post not found
   * @returns {object} 500 - Internal server error
   */
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

  /**
   * @route DELETE /posts/delete/{id}
   * @summary Delete an existing post
   * @tags Posts
   * @security BearerAuth
   * @param {string} id.path.required - The unique ID of the post to be deleted
   * @returns {object} 200 - Post deleted successfully
   * @returns {object} 401 - Unauthorized
   * @returns {object} 403 - Forbidden
   * @returns {object} 404 - Post not found
   * @returns {object} 500 - Internal server error
   * @example response - 200 - Example success response
   * {
   *  "message": "Post deleted successfully"
   * }
   */
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
