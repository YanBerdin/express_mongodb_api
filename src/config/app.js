const express = require("express");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const jwt = require("jsonwebtoken");
const RevokedToken = require("../core/entities/RevokedToken");
const options = require("../../swaggerConfig");
const loggerMiddleware = require("../infrastructure/api/middlewares/loggerMiddleware");

// Import des routes
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
    this.app.use("/", this.authorize.bind(this), protectedRoutes);
    this.app.use("/", this.authorize.bind(this), protectedUserRoutes);
  }

  async authorize(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(req.headers); //TODO Remove
    console.log(req.headers.authorization); //TODO Remove

    if (authHeader && authHeader.split(" ")[0] === "Bearer") {
      // if (authHeader && authHeader.startsWith("Bearer ")) { //TODO
      const token = authHeader.split(" ")[1];
      const revokedToken = await RevokedToken.findOne({ token });
      if (revokedToken) {
        return res.status(401).json({ message: "Token révoqué" });
      }
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).json({ message: "Token invalide" });
        }
        req.user = decode;
        next();
      });
    } else {
      return res
        .status(401)
        .json({ message: "authorize:  Utilisateur non authentifié" });
    }
  }

  getApp() {
    return this.app;
  }
}

module.exports = App;
