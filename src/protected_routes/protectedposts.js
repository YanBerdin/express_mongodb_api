const { validationResult } = require("express-validator");
const {
  validateCreatePost,
  validateUpdatePost,
  validatePostId,
} = require("../validators");

const {
  createPost,
  findOnePostAndUpdate,
  findOnePostAndDelete,
} = require("../controllers/postController");

const User = require("../models/User");

const { generateAPIKey } = require("../controllers/userController");

// Middleware loginRequiered :Check if the user is logged in
function loginRequiered(req, res, next) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized user, Please register a new account or login",
    });
  }
  next(); // Call the next middleware
}

// Middleware apiKeyRequired : Check if the user has an API key
async function apiKeyRequired(req, res, next) {
  const apiKey = req.header("x-api-key");
  const users = await User.find({});
  console.log("apiKeyRequired", users);
  const account = users.find((user) => user.apiKey === apiKey);
  console.log(account);
  if (!apiKey || !account) {
    return res.status(403).json({
      code: 403,
      message: "You are not allowed. Register for a new Api key",
    });
  }

  next();
}

module.exports = (protectedrouter) => {
  /**
   * POST /generateApiKey
   * @summary Generate a new API key
   * @tags Auth
   * @return {object} 200 - Successful response
   * @example response - 200 - Example success response
   * {
   *   "apiKey": "abcd1234efgh5678ijkl9101"
   * }
   * @return {object} 401 - Unauthorized
   * @example response - 401 - Example unauthorized response
   * {
   *   "message": "Unauthorized user, Please register a new account or login"
   * }
   */
  protectedrouter.post("/generateApiKey", loginRequiered, generateAPIKey);

  /**
   * POST /posts/create
   * @summary Create a new post
   * @tags Posts
   * @param {Post} request.body.required - Post information
   * @return {object} 201 - Post created successfully
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
   * @typedef {object} Post
   * @property {string} title.required - Title of the post
   * @property {string} content.required - Content of the post
   * @property {string} author.required - Author of the post
   * @example
   * {
   *  "title": "Mon Premier Post",
   * "content": "Ceci est le contenu du post.",
   * "author": "John Doe"
   * }
   */
  protectedrouter.post(
    "/posts/create",
    loginRequiered,
    apiKeyRequired,
    createPost,
    validateCreatePost
  );
  /**
   * PATCH /posts/update/{id}
   * @summary Update an existing post
   * @tags Posts
   * @param {string} id.path.required - The unique ID of the post to be updated
   * @param {Post} request.body.required - Post information
   * @return {object} 200 - Post updated successfully
   * @example response - 200 - Example success response
   * {
   *   "id": "612e123a4f1a4a23e4d12345",
   *   "title": "Mon Premier Post Modifié",
   *   "content": "Ceci est le contenu modifié du post.",
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
   * @return {object} 404 - Not found
   * @example response - 404 - Example not found response
   * {
   *   "message": "Post not found"
   * }
   */
  protectedrouter.patch(
    "/posts/update/:id",
    loginRequiered,
    apiKeyRequired,
    findOnePostAndUpdate,
    validatePostId,
    validateUpdatePost
  );

  /**
   * DELETE /posts/delete/{id}
   * @summary Delete an existing post
   * @tags Posts
   * @param {string} id.path.required - The unique ID of the post to be deleted
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
  protectedrouter.delete(
    "/posts/delete/:id",
    loginRequiered,
    apiKeyRequired,
    findOnePostAndDelete,
    validatePostId
  );
};
