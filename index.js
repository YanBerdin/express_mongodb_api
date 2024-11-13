const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const RevokedToken = require("./src/models/RevokedToken");

require("dotenv").config();
//const Post = require("./models");
const PORT = process.env.PORT || 3000;

//const swaggerConfig = require("./swaggerConfig");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const options = require("./swaggerConfig");

//const data = require("./posts");
//TODO const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;

const app = express();

app.use(express.json()); // Middleware for parsing application/json

// const router = express.Router();
const postrouter = express.Router();
const userrouter = express.Router();
const protectedrouter = express.Router();
const protectedUserRouter = express.Router();

// require("./src/routes/posts")(router);
require("./src/routes/freeposts")(postrouter);
// require("./src/routes/userroutes")(router);
require("./src/routes/userroutes")(userrouter);
// require("./src/routes/post")(router);
require("./src/protected_routes/protectedposts")(protectedrouter);
require("./src/protected_routes/protectedUserRoute")(protectedUserRouter);

// Appliquer la configuration Swagger
expressJSDocSwagger(app)(options);

async function authorize(req, res, next) {
  const authHeader = req.headers.authorization;
  //console.log(authHeader);
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
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }
}

// Définir une route GET pour la racine de l'API
/**
 * @openapi
 * /:
 *   get:
 *     summary: Renvoie un message de bienvenue
 *     description: Renvoie un message de bienvenue à l'utilisateur.
 *     tags:
 *       - Racine
 *     responses:
 *       200:
 *         description: Message de bienvenue
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Hello World!
 *       400:
 *         description: Requête incorrecte
 *       401:
 *         description: Utilisateur non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Message de bienvenue introuvable
 *       405:
 *         description: Méthode non autorisée
 *       409:
 *         description: Conflit
 *       429:
 *         description: Trop de requêtes
 *       500:
 *         description: Erreur lors de la récupération du message de bienvenue
 */
postrouter.get("/", (req, res) => {
  res.send("Hello API !");
});
postrouter.get("/api/docs", (req, res) => {
  res.redirect("/api/docs");
});

app.use("/", postrouter);
app.use("/", userrouter);
app.use(authorize);
app.use("/", protectedrouter);
app.use("/", protectedUserRouter);

// Connexion à la base de données et démarrage du serveur
app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("successfully connected to the database");
    })
    .catch((err) => {
      console.error("Error connecting to the database", err);
    });
  mongoose.connection.on("connected", () => console.log("connected"));
  mongoose.connection.on("open", () => console.log("open"));
  mongoose.connection.on("disconnected", () => console.log("disconnected"));
  mongoose.connection.on("reconnected", () => console.log("reconnected"));
  mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
  mongoose.connection.on("close", () => console.log("close"));
});
