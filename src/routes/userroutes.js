const { validateLogin, validateRegister } = require("../validators");
const { register, login } = require("../controllers/userController");

module.exports = (userrouter) => {
  /**
   * POST /auth/register
   * @summary Register a new user
   * @tags Auth
   * @param {object} request.body.required - User's information - application/json
   * @param {string} request.body.firstName - User's first name
   * @param {string} request.body.lastName - User's last name
   * @param {string} request.body.username - Username for the account
   * @param {string} request.body.email - User's email
   * @param {string} request.body.password - Password for the account
   * @return {object} 200 - Successful registration response
   * @return {object} 400 - Validation error
   */
  userrouter.post("/auth/register", validateRegister, register);
  /**
   * POST /auth/login
   * @summary User login
   * @tags Auth
   * @param {object} request.body.required - Login credentials - application/json
   * @param {string} request.body.email - User's email
   * @param {string} request.body.password - User's password
   * @return {object} 200 - Successful login response with token
   * @return {object} 400 - Invalid credentials
   */
  userrouter.post("/auth/login", validateLogin, login);
};
