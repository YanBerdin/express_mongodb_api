const express = require("express");

const { validationResult } = require("express-validator");
const { validatePostId } = require("../middlewares/validators");

const { findPosts, findOnePost } = require("../controllers/postController");

//?const PostController = require("../controllers/postController");

const postRoutes = express.Router();

//* module.exports = (postrouter) => {
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
 *   },
 *  {
 *   "title": "Ancient Mystery Unveiled",
 *   "content": "Embark on a quest to decipher the ancient runes and unlock the secrets of a long-lost civilization.",
 *   "author": "John Doe"
 *   },
 *   {
 *   "title": "Space Odyssey Begins",
 *   "content": "Launch into the cosmos and explore distant galaxies in this epic space adventure.",
 *   "author": "Jane Doe"
 *   },
 *   {
 *   "title": "Magic Academy Opens Its Doors",
 *   "content": "Enroll in the prestigious Magic Academy and master the arcane arts to become a legendary sorcerer.",
 *   "author": "Merlin the Wizard"
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
postRoutes.get("/posts", findPosts);

/**
 * GET /posts/{id}
 * @summary Returns a post by ID
 * @tags Posts
 * @param {string} id.path.required - ID param
 * @return {Post} 200 - Détails du post - application/json
 * @example response - 200 - Exemple de réponse réussie
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
postRoutes.get("/posts/:id", validatePostId, findOnePost);
//* };
module.exports = postRoutes;
