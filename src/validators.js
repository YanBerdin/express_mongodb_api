const { check } = require("express-validator");

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
    .withMessage("Password must be at least 6 characters long"),
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

const validateCreatePost = [
  check("title").notEmpty().withMessage("Title is required").trim().escape(),
  check("content")
    .notEmpty()
    .withMessage("Content is required")
    .trim()
    .escape(),
  check("author").notEmpty().withMessage("Author is required").trim().escape(),
];

const validateUpdatePost = [
  check("id").isMongoId().withMessage("Invalid post ID").trim().escape(),
  check("title").optional().trim().escape(),
  check("content").optional().trim().escape(),
  check("author").optional().trim().escape(),
];

module.exports = {
  validateLogin,
  validateRegister,
  validatePostId,
  validateCreatePost,
  validateUpdatePost,
};
