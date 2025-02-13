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

  /**
   * POST /auth/logout
   * @summary User logout
   * @tags Auth
   * @security BearerAuth
   * @return {object} 200 - Successful logout response
   * @example response - 200 - Example success response
   * {
   *  "message": "User logged out successfully"
   * }
   * 
   * */
module.exports = (protectedUserRouter) => {
  protectedUserRouter.post("/auth/logout", loginRequired, logout);
};
