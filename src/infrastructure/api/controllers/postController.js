const { validationResult } = require("express-validator");
// const PostUseCases = require("../../../core/usecases/postUseCases");
const CreatePostUseCase = require("../../../core/usecases/post-use-cases/create-post");
const FindPostsUseCase = require("../../../core/usecases/post-use-cases/find-posts");
const FindOnePostUseCase = require("../../../core/usecases/post-use-cases/find-one-post");
const UpdatePostUseCase = require("../../../core/usecases/post-use-cases/update-post");
const DeletePostUseCase = require("../../../core/usecases/post-use-cases/delete-post");

const mongoose = require("mongoose");

class PostController {
  constructor() {
    // this.postUseCases = new PostUseCases();
    this.createPostUseCase = new CreatePostUseCase();
    this.findPostsUseCase = new FindPostsUseCase();
    this.findOnePostUseCase = new FindOnePostUseCase();
    this.updatePostUseCase = new UpdatePostUseCase();
    this.deletePostUseCase = new DeletePostUseCase();
  }

  // GET /posts
  findPosts = async (req, res) => {
    // console.log(">> GET /posts");
    try {
      const posts = await this.findPostsUseCase.findPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // POST /posts/create
  createPost = async (req, res) => {
    console.log(">> POST /posts/create", req.params.id); //TODO: Remove this line
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log(req.body); //TODO: Remove this line
      const post = await this.createPostUseCase.createPost(req.body);
      res.status(201).json(post);
    } catch (error) {
      console.log(error); //TODO: Remove this line
      res.status(500).json({
        message: "Erreur lors de la création du post",
        error: error.message,
      });
    }
  };

  // GET /posts/:id
  findOnePost = async (req, res) => {
    console.log(">> GET /posts/:id", req.params.id); //TODO: Remove this line
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await this.findOnePostUseCase.findOnePost(req.params.id);
      //console.log(">> GET /posts/:id", req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post doesn't exist!" });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // PATCH /posts/update/:id
  findOnePostAndUpdate = async (req, res) => {
    console.log(">> PATCH /posts/update/:id", req.params.id); //TODO: Remove this line
    console.log(
      "findOnePostAndUpdate : ObjectId valide ?",
      mongoose.Types.ObjectId.isValid(req.params.id)
    ); //TODO: Remove this line
    try {
      const updatedPost = await this.updatePostUseCase.updatePost(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({ message: "Post successfully updated", post: updatedPost });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // DELETE /posts/delete/:id
  findOnePostAndDelete = async (req, res) => {
    console.log(">> DELETE /posts/delete/:id", req.params.id); //TODO: Remove this line
    console.log(
      "Est-ce un ObjectId valide ?",
      mongoose.Types.ObjectId.isValid(req.params.id)
    ); // TODO: Remove this line
    try {
      const result = await this.deletePostUseCase.deletePost(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Post introuvable" });
      }
      res.status(200).json({ message: "Post supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new PostController();
