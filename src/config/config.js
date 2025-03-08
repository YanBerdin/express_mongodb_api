require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  tokenSecret: process.env.TOKEN_SECRET || "default_secret",
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/myapp",
  // debug: process.env.DEBUG === "true",
};
