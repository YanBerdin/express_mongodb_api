const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
//const Post = require("./models");
const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("PORT is not defined in the environment variables"); //TODO throw new Error
}
//const data = require("./posts");
const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;
// const router = express.Router();
const postrouter = express.Router();
const userrouter = express.Router();
const protectedrouter = express.Router();

// require("./src/routes/posts")(router);
require("./src/routes/freeposts")(postrouter);
// require("./src/routes/userroutes")(router);
require("./src/routes/userroutes")(userrouter);
// require("./src/routes/post")(router);
require("./src/protected_routes/protectedposts")(protectedrouter);

app.use(express.json()); // Middleware for parsing application/json

// Middleware
function authorize(req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.TOKEN_SECRET,
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
}

// Définir une route GET pour la racine de l'API
postrouter.get("/", (req, res) => {
  res.send("Hello Backend Express World!");
});

// Utiliser le routeur
app.use("/", postrouter);
app.use("/", userrouter);
app.use(authorize);
app.use("/", protectedrouter);

// Démarrer le serveur
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
