const express = require("express");

const { validationResult } = require("express-validator");

const {
  validateCreatePost,
  validateUpdatePost,
  validatePostId,
} = require("../middlewares/validators");

const {
  createPost,
  findOnePostAndUpdate,
  findOnePostAndDelete,
} = require("../controllers/postController");

const User = require("../../../core/entities/User");

const loginRequired = require("../middlewares/loginRequired");

const protectedRoutes = express.Router();

//* module.exports = (protectedrouter) => {
/**
 * POST /posts/create
 * @summary Create a new post
 * @tags Posts
 * @security BearerAuth
 * @param {Post} request.body.required - Post information
 * @return {Post} 201 - Post created successfully
 * @example response - 201 - Example success response
 * {
 *   "id": "612e123a4f1a4a23e4d12345",
 *   "title": "Mon Premier Post",
 *   "content": "Ceci est le contenu du post.",
 *   "created_at": "2023-10-12T07:20:50.52Z",
 *   "author": "John Doe"
 * }
 * @return {object} 400 - Validation error
 * @example response - 400 - Example error response
 * {
 *   "message": "Validation failed",
 *   "errors": {
 *     "title": "Title is required"
 *   }
 * }
 * @return {object} 401 - Unauthorized
 * @example response - 401 - Example unauthorized response
 * {
 *   "message": "Unauthorized user, Please register a new account or login"
 * }
 * @return {object} 403 - Forbidden
 * @example response - 403 - Example forbidden response
 * {
 *   "message": "You are not allowed. Register for a new Api key"
 * }
 */

/**
 * @typedef {object} Post - Post information
 * @property {string} title.required - Title of the post
 * @property {string} content.required - Content of the post
 * @property {string} author.required - Author of the post
 * @example request - Example post
 * {
 *  "title": "Mon Premier Post",
 * "content": "Ceci est le contenu du post.",
 * "author": "John Doe"
 * }
 */
protectedRoutes.post(
  "/posts/create",
  loginRequired,
  // apiKeyRequired,
  validateCreatePost,
  createPost
);
/**
 * PATCH /posts/update/{id}
 * @summary Update an existing post by Id
 * @tags Posts
 * @security BearerAuth
 * @param {string} id.path.required - The unique ID of the post to be updated
 * @param {Post} request.body.required - Post information
 * @return {Post} 200 - Post updated successfully
 * @example response - 200 - Example success response
 * {
 *   "id": "612e123a4f1a4a23e4d12345",
 *   "title": "Post Modifié",
 *   "content": "Contenu modifié du post.",
 *   "created_at": "2023-10-12T07:20:50.52Z",
 *   "author": "Auteur Modifié"
 * }
 * @return {object} 400 - Validation error
 * @example response - 400 - Example error response
 * {
 *   "message": "Validation failed",
 *   "errors": {
 *     "title": "Title is required"
 *   }
 * }
 * @return {object} 401 - Unauthorized
 * @example response - 401 - Example unauthorized response
 * {
 *   "message": "Unauthorized user, Please register a new account or login"
 * }
 * @return {object} 403 - Forbidden
 * @example response - 403 - Example forbidden response
 * {
 *   "message": "You are not allowed. Register for a new Api key"
 * }
 * @return {object} 404 - Not found
 * @example response - 404 - Example not found response
 * {
 *   "message": "Post not found"
 * }
 */
protectedRoutes.patch(
  "/posts/update/:id",
  loginRequired,
  // apiKeyRequired,
  validatePostId,
  validateUpdatePost,
  findOnePostAndUpdate
);

/**
 * DELETE /posts/delete/{id}
 * @summary Delete an existing post
 * @tags Posts
 * @security BearerAuth
 * @param {string} id.path.required - The unique ID of the post to be deleted:
 * @return {object} 200 - Post deleted successfully
 * @example response - 200 - Example success response
 * {
 *   "message": "Post deleted successfully"
 * }
 * @return {object} 401 - Unauthorized
 * @example response - 401 - Example unauthorized response
 * {
 *   "message": "Unauthorized user, Please register a new account or login"
 * }
 * @return {object} 403 - Forbidden
 * @example response - 403 - Example forbidden response
 * {
 *   "message": "You are not allowed. Register for a new Api key"
 * }
 * @return {object} 404 - Not found
 * @example response - 404 - Example not found response
 * {
 *   "message": "Post not found"
 * }
 */
protectedRoutes.delete(
  "/posts/delete/:id",
  (req, res, next) => {
    console.log(
      "Route DELETE /posts/delete/:id atteinte avec ID:",
      req.params.id
    ); //TODO: Remove
    next();
  },
  loginRequired,
  // apiKeyRequired,
  validatePostId,
  findOnePostAndDelete
);
//*};
module.exports = protectedRoutes;
