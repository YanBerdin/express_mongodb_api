const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
//const Post = require("./models");
const port = process.env.port || 3000;
//const data = require("./posts");

require("dotenv").config();

const postrouter = express.Router(); // const router = express.Router();
const userrouter = express.Router();
const protectedrouter = express.Router();

// require("./src/routes/posts")(router);
require("./src/routes/freeposts")(postrouter);
// require("./src/routes/userroutes")(router);
require("./src/routes/userroutes")(userrouter);
// require("./src/routes/post")(router);
require("./src/protected_routes/protectedposts")(protectedrouter);

app.use(express.json());

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

// Définir une route GET pour la racine
postrouter.get("/", (req, res) => {
  res.send("Hello Backend Express World!");
});

// Utiliser le routeur
app.use("/", postrouter);
app.use("/", userrouter);
app.use(authorize);
app.use("/", protectedrouter);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("successfully connected to the database");
  });
});
