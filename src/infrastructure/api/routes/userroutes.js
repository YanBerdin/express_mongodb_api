const express = require("express");

const {
  validateLogin,
  validateRegister,
} = require("../middlewares/validators");
const { register, login } = require("../controllers/userController");

const userRoutes = express.Router();

// module.exports = (userrouter) => {

/**
 * @openapi
 * GET /
 * @summary Welcome message
 * @tags Root
 * @description Welcome message to the API
 * @return {string} 200 - Welcome message
 * @example response - 200 - Example welcome message
 * "Hello API !"
 */
userRoutes.get("/", (req, res) => {
  res.send('<h1> Hello API !</h1> <a href="/api/docs">Documentation</a>'); //TODO: Remove Html
  // res.send('Hello API ! documentation: /api/docs');
});

/**
 * POST /auth/register
 * @summary Register a new user
 * @tags Auth
 * @param {RegisterRequest} request.body.required - User's information
 * @return {object} 201 - Successful registration response
 * @example response - 201 - Example success response
 * {
 * "message": "User registered successfully",
 *   "user": {
 *     "firstName": "Capitaine",
 *     "lastName": "Flame",
 *     "username": "Flame2026",
 *     "email": "flame2026@free.fr",
 *     "_id": "67ae8def466442048a96fa22",
 *     "created_at": "2025-02-14T00:27:27.277Z",
 *     "apiKey": "$2b$10$ArHVzMqjv8aNdKcLSoSxT.kPK/lLEp4aeLCk9BwYA9UMzdgVOfiQW",
 *     "__v": 0
 *   }
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
userRoutes.post("/auth/register", validateRegister, register);
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
 */
/**
 * @typedef {object} LoginRequest
 * @property {string} email.required - User's email
 * @property {string} password.required - User's password
 */
userRoutes.post("/auth/login", validateLogin, login);
//};

module.exports = userRoutes;
