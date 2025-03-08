const express = require("express");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const options = require("../../swaggerConfig");
const loggerMiddleware = require("../infrastructure/api/middlewares/loggerMiddleware");
const authorize = require("../infrastructure/api/middlewares/authMiddleware");

const userRoutes = require("../infrastructure/api/routes/userroutes");
const postRoutes = require("../infrastructure/api/routes/freeposts");
const protectedRoutes = require("../infrastructure/api/protected_routes/protectedposts");
const protectedUserRoutes = require("../infrastructure/api/protected_routes/protectedUserRoute");

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(loggerMiddleware);
    this.app.use(express.json());
    expressJSDocSwagger(this.app)(options);
  }

  setupRoutes() {
    this.app.get("/api/docs", (req, res) => {
      // res.redirect("/api/docs");
    });

    this.app.use("/", postRoutes);
    this.app.use("/", userRoutes);
    this.app.use("/", authorize, protectedRoutes);
    this.app.use("/", authorize, protectedUserRoutes);
  }

  getApp() {
    return this.app;
  }
}

module.exports = App;
