const { logout } = require("../controllers/userController"); // {generateAPIKey}
const User = require("../models/User");
// const apiKeyRequired = require("../middlewares/apiKeyRequired");
const loginRequired = require("../middlewares/loginRequired");

/*
module.exports = (protectedUserRouter) => {
  protectedUserRouter.post("/generateApiKey", loginRequired, generateAPIKey);
  protectedUserRouter.post(
    "/auth/logout",
    loginRequired,
    apiKeyRequired,
    logout
  );
*/
module.exports = (protectedUserRouter) => {
  protectedUserRouter.post("/auth/logout", loginRequired, logout);
};
