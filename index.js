const express = require("express");
const mongoose = require("mongoose");
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
//! require("./src/routes/post")(postrouter);
// require("./src/routes/userroutes")(router);
require("./src/routes/userroutes")(userrouter);
require("./src/protected_routes/protectedposts")(protectedrouter);





// require("./src/protected_routes/post")(protectedrouter);


app.use(express.json());

// let posts = [];

/** Without routeur */
/*
app.get("/", (req, res) => {
  res.send("Hello Backend Express World!");
});
*/

// Définir une route GET pour la racine
postrouter.get("/", (req, res) => {
  res.send("Hello Backend Express World!");
});

/** Get local data */
/*
app.get("/posts", (req, res) => {
    const data_posts = [...posts, ...data];
    res.send(data_posts);
  });
*/

/** Get data from database */
/*
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
});
*/

/** Get local data */
/*
app.post("/posts/create", (req, res) => {
    // posts = [...posts, ...data, ...req.body];
    posts = [...posts, req.body];
    res.send("new post successfully added");
  });
  */

/** data from database */
/*
app.post("/posts/create", (req, res) => {
  try {
    const post = new Post(req.body);
    post.save();
    res.send("new post successfully added");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
*/

/*
app.put("/posts/update/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const update = req.body;
    const post = await Post.findOneAndUpdate(query, update);
    post.save();
    res.send("new post successfully edited");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
*/

/*
app.delete("/posts/delete/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const post = await Post.findOneAndDelete(query);
    res.send("new post successfully deleted");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
*/

/* Local data */
/*
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/

/* Database data without routeur */
/*
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose.connect("mongodb://127.0.0.1:27017/database").then(() => {
    console.log("successfully connected to the database !");
  });
});
*/

// Utiliser le routeur
app.use("/", postrouter);
app.use("/", userrouter);
app.use("/", protectedrouter);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("successfully connected to the database");
  });
});
