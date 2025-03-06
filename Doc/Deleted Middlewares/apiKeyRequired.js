/*
const User = require("../models/User");

async function apiKeyRequired(req, res, next) {
    const apiKey = req.header("x-api-key");
    if (!apiKey) {
      return res.status(403).json({
        code: 403,
        message: "You are not allowed. Register for a new API key",
      });
    }

    try {
      const account = await User.findOne({ apiKey });
      if (!account) {
        return res.status(403).json({
          code: 403,
          message: "Invalid API key. Register for a new API key",
        });
      }

      next();
    } catch (error) {
      console.error("Error in apiKeyRequired middleware:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = apiKeyRequired;
*/