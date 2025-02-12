// const apiKeyRequired = require("../middlewares/apiKeyRequired");
const { logout } = require("../controllers/userController"); // {generateAPIKey}
const User = require("../models/User");

// Middleware
function loginRequiered(req, res, next) {
  console.log('Authorization header:', req.headers); //TODO: Remove
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized user, Please register a new account or login",
    });
  }
  next();
}

/*
module.exports = (protectedUserRouter) => {
  protectedUserRouter.post("/generateApiKey", loginRequiered, generateAPIKey);
  protectedUserRouter.post(
    "/auth/logout",
    loginRequiered,
    apiKeyRequired,
    logout
  );
*/
module.exports = (protectedUserRouter) => {
  protectedUserRouter.post("/auth/logout", loginRequiered, logout);
};
