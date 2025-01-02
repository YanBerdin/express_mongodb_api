const { validateLogin, validateRegister } = require("../validators");
const { register, login } = require("../controllers/userController");

module.exports = (userrouter) => {
  /**
   * POST /auth/register
   * @summary Register a new user
   * @tags Auth
   * @param {RegisterRequest} request.body.required - User's information
   * @return {object} 200 - Successful registration response
   * @example response - 200 - Example success response
   * {
   *   "message": "User registered successfully",
   *   "userId": "12345"
   * }
   * @return {object} 400 - Validation error
   * @example response - 400 - Example error response
   * {
   *   "message": "Validation failed",
   *   "errors": {
   *     "email": "Invalid email format"
   *   }
   * }
   * @return {object} 500 - Server error
   * @example response - 500 - Example server error response
   * {
   *  "message": "Server error"
   * }
   * @return {object} 404 - Not found
   * @example response - 404 - Example not found response
   * {
   * "message": "Not found"
   * }
   * @return {object} 403 - Forbidden
   * @example response - 403 - Example forbidden response
   * {
   * "message": "Forbidden"
   * }
   */
  /**
   * @typedef {object} RegisterRequest
   * @property {string} firstName.required - User's first name
   * @property {string} lastName.required - User's last name
   * @property {string} username.required - Username for the account
   * @property {string} email.required - User's email
   * @property {string} password.required - Password for the account
   */
  userrouter.post("/auth/register", validateRegister, register);

  /**
   * POST /auth/login
   * @summary User login
   * @tags Auth
   * @param {LoginRequest} request.body.required - Login credentials
   * @return {object} 200 - Successful login response with token
   * @example response - 200 - Example success response
   * {
   *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   * }
   * @return {object} 400 - Invalid credentials
   * @example response - 400 - Example error response
   * {
   *  "message": "Invalid email or password"
   * }
   * @return {object} 401 - Unauthorized
   * @example response - 401 - Example unauthorized response
   * {
   * "message": "Unauthorized"
   * }
   * @return {object} 500 - Server error
   * @example response - 500 - Example server error response
   * {
   * "message": "Server error"
   * }
   * @return {object} 404 - Not found
   * @example response - 404 - Example not found response
   * {
   * "message": "Not found"
   * }
   * @return {object} 403 - Forbidden
   * @example response - 403 - Example forbidden response
   * {
   * "message": "Forbidden"
   * }
   */

  /**
   * @typedef {object} LoginRequest
   * @property {string} email.required - User's email
   * @property {string} password.required - User's password
   */
  userrouter.post("/auth/login", validateLogin, login);
};
