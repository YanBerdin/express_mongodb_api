const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const RevokedToken = require("./src/models/RevokedToken");

require("dotenv").config();
//const Post = require("./models");
const PORT = process.env.PORT || 3000;

if (!process.env.MONGODB_URI) {
  console.error("❌ Erreur : MONGODB_URI non définie dans .env");
  process.exit(1);
}

//TODO const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;

const expressJSDocSwagger = require("express-jsdoc-swagger");
const options = require("./swaggerConfig");

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

// Définir une route GET pour la racine de l'API
/**
  * GET /
  * @summary API Root
  * @return {string} 200 - Hello API ! - text/html
 */
postrouter.get("/", (req, res) => {
  res.send('<h1> Hello API !</h1> <a href="/api/docs">Documentation</a>'); //TODO: Remove Html
  // res.send('Hello API ! documentation: /api/docs');
});

postrouter.get("/api/docs", (req, res) => {
  // res.redirect("/api/docs");
});

app.use("/", postrouter);
app.use("/", userrouter);
app.use("/", authorize, protectedrouter);
app.use("/", authorize, protectedUserRouter);

// Connexion à la base de données et démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 app listening on PORT ${PORT}`);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("✅ successfully connected to the database");
    })
    .catch((err) => {
      console.error("❌ Error connecting to the database", err);
    });
  mongoose.connection.on("connected", () => console.log("connected"));
  mongoose.connection.on("disconnected", () => console.log("disconnected"));
  mongoose.connection.on("reconnected", () => console.log("reconnected"));
  mongoose.connection.on("close", () => console.log("close"));
});

/*
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connexion à la base de données réussie");
    app.listen(PORT, () => {
      console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Échec de la connexion à la base de données", err);
    //process.exit(1);
  });

mongoose.connection.on("connected", () => console.log("🔗 MongoDB : connecté"));
mongoose.connection.on("disconnected", () => console.log("🔌 MongoDB : déconnecté"));
mongoose.connection.on("reconnected", () => console.log("♻️ MongoDB : reconnecté"));
mongoose.connection.on("close", () => console.log("❎ MongoDB : connexion fermée"));
*/
