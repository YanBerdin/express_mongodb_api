const { validationResult } = require("express-validator");
const { validatePostId } = require("../validators");

const { findPosts, findOnePost } = require("../controllers/postController");

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
   */
  /**
   * @typedef {object} Post - Post information
   * @property {string} title.required - Title of the post
   * @property {string} content.required - Content of the post
   * @property {string} author.required - Author of the post
   * @property {string} created_at.required - Date of creation
   * @property {string} _id.required - Post ID
   */
  postrouter.get("/posts", findPosts);

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
   */
  /**
   * @typedef {object} Post - Post information
   * @property {string} title.required - Title of the post
   * @property {string} content.required - Content of the post
   * @property {string} author.required - Author of the post
   */
  postrouter.get("/posts/:id", validatePostId, findOnePost);
};
