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
//const apiKeyRequired = require("../middlewares/apiKeyRequired");
const User = require("../models/User");

//const { generateAPIKey } = require("../controllers/userController");

// Middleware loginRequired :Check if the user is logged in
/*
function loginRequired(req, res, next) {
  console.log("Authorization header:", req.headers.authorization); // Débogage

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Token manquant ou invalide" });
  }

  const token = req.headers.authorization.split(" ")[1]; // Extraire le token

  if (!token) {
    return res.status(401).json({ message: "Token manquant ou invalide" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }

    req.user = user;
    next();
  });
}
*/

function loginRequired(req, res, next) {
  console.log("Middleware loginRequired appelé"); //TODO: Remove
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized user, Please register a new account or login",
    });
  }
  next(); // Call the next middleware
}

/*
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
*/

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
  // protectedrouter.post("/generateApiKey", loginRequired, generateAPIKey);

  /**
   * POST /posts/create
   * @summary Create a new post
   * @tags Posts
   * @security BearerAuth
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
    loginRequired,
    // apiKeyRequired,
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
    loginRequired,
    // apiKeyRequired,
    findOnePostAndUpdate,
    validatePostId,
    validateUpdatePost
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
  protectedrouter.delete(
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
};
