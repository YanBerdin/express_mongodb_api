const { validationResult } = require("express-validator");
const { validatePostId } = require("../validators");

const {
  findPosts,
  findOnePost,
} = require("../controllers/postController");

module.exports = (postrouter) => {
  /**
   * GET /posts
   * @summary Returns a list of posts
   * @tags Posts
   * @return {object} 200 - Success response with an array of posts - application/json
   * @example response - 200 - Success response
   * [
   *   {
   *     "_id": "60d5f67f8d5f3f1b28b456b9",
   *     "title": "Hello World!",
   *     "content": "This is the content of the post.",
   *     "created_at": "2023-10-12T07:20:50.52Z",
   *     "author": "John Doe"
   *   }
   * ]
   * @response 500 - Internal server error
   * @response 404 - Post not found
   */
  postrouter.get("/posts", findPosts);

  //! @return {object} et pas {array<Post>} => le type array n'est pas supporté
  /**
   * GET /posts/{id}
   * @summary Returns a post by ID
   * @tags Posts
   * @param {string} id.path.required - ID param
   * @return {object} 200 - Détails du post - application/json
   * @example response - 200 - Success response
   * {
   * "title": "Hello World!",
   * "content": "This is the content of the post.",
   * "created_at": "2023-10-12T07:20:50.52Z",
   * "author": "John Doe"
   * }
   * @return {object} 404 - Post introuvable
   * @example response - 404 - Post introuvable
   * {
   * "error": "Post doesn't exist!"
   * }
   */
  postrouter.get("/posts/:id", validatePostId, findOnePost);
};
