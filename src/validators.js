const { check } = require("express-validator"); //

const validateLogin = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  check("password").notEmpty().withMessage("Password is required"),
];

const validateRegister = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character"),
    /*
    check("age")
    .isInt({ min: 18, max: 99 })
    .withMessage("Age must be between 18 and 99"),
  check("website")
    .optional()
    .isURL()
    .withMessage("Invalid URL"),
  check("isAdmin")
    .isBoolean()
    .withMessage("isAdmin must be a boolean")
    */
];

const validatePostId = [
  check("id").isMongoId().withMessage("Invalid post ID").trim().escape(),
];
/* // TODO
const validateMongoId = (fieldName = "id") =>
  check(fieldName).isMongoId().withMessage(`Invalid ${fieldName}`).trim().escape();
*/

const validateField = (fieldName, required = false) =>
  required
    ? check(fieldName)
        .notEmpty()
        .withMessage(`${fieldName} is required`)
        .trim()
        .escape()
    : check(fieldName).optional().trim().escape();

/*
const validateCreatePost = [
  check("title").notEmpty().withMessage("Title is required").trim().escape(),
  check("content")
    .notEmpty()
    .withMessage("Content is required")
    .trim()
    .escape(),
  check("author").notEmpty().withMessage("Author is required").trim().escape(),
];
*/
const validateCreatePost = [
  validateField("title", true),
  validateField("content", true),
  validateField("author", true),
];

/*
const validateUpdatePost = [
  check("id").isMongoId().withMessage("Invalid post ID").trim().escape(),
  check("title").optional().trim().escape(),
  check("content").optional().trim().escape(),
  check("author").optional().trim().escape(),
];
*/
const validateUpdatePost = [
  // validateField("id").isMongoId().withMessage("Invalid post ID"),
  validateField("title"),
  validateField("content"),
  validateField("author"),
];

module.exports = {
  validateLogin,
  validateRegister,
  validatePostId,
  validateCreatePost,
  validateUpdatePost,
};
