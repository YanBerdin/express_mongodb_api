const { validationResult } = require("express-validator");
const {
  validateCreatePost,
  validateUpdatePost,
  validatePostId
} = require("../validators");

const {
  createPost,
  findOnePostAndUpdate,
  findOnePostAndDelete,
} = require("../controllers/postController");

const User = require("../models/User");

const { generateAPIKey } = require("../controllers/userController");

// Middleware
function loginRequiered(req, res, next) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized user, Please register a new account or login",
    });
  }
  next(); // Call the next middleware
}

// Middleware
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
  protectedrouter.post("/generateApiKey", loginRequiered, generateAPIKey);
  protectedrouter.post(
    "/posts/create",
    loginRequiered,
    apiKeyRequired,
    createPost,
    validateCreatePost
  );
  protectedrouter.patch(
    "/posts/update/:id",
    loginRequiered,
    apiKeyRequired,
    findOnePostAndUpdate,
    validatePostId,
    validateUpdatePost
  );
  protectedrouter.delete(
    "/posts/delete/:id",
    loginRequiered,
    apiKeyRequired,
    findOnePostAndDelete,
    validatePostId
  );
};
