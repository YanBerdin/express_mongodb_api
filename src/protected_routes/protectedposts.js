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
} = require("../controllers/post");

const User = require("../models/User");

const { generateAPIKey } = require("../controllers/user");

// Middleware
function login(req, res, next) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized user, Please register a new account or login",
    });
  }
  next();
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
  protectedrouter.post("/generateApiKey", login, generateAPIKey);
  protectedrouter.post(
    "/posts/create",
    login,
    apiKeyRequired,
    createPost,
    validateCreatePost
  );
  protectedrouter.patch(
    "/posts/update/:id",
    login,
    apiKeyRequired,
    findOnePostAndUpdate,
    validateUpdatePost
  );
  protectedrouter.delete(
    "/posts/delete/:id",
    login,
    apiKeyRequired,
    findOnePostAndDelete,
    validatePostId
  );
};
