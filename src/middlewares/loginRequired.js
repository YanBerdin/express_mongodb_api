const User = require("../models/User");

async function loginRequired(req, res, next) {
    console.log("Authorization header:", req.headers); //TODO: Remove
    if (!req.user) {
      res.status(401).json({
        message: "Unauthorized user, Please register a new account or login",
      });
    }
    next();
  }

module.exports = loginRequired;