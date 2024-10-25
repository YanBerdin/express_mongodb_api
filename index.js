const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Post = require("./models");
//const port = 3000
const port = process.env.port || 3000;
const data = require("./posts");
const helmet = require("helmet");

app.use(express.json());

/*
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://moonlit-tomb-9rp6jqx6jv5364q-3000.app.github.dev/"],
      // Ajoutez d'autres directives si nécessaire
    },
  })
);
*/

let posts = [];

app.get("/", (req, res) => {
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
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
});

/** Get local data */
/*
app.post("/posts/create", (req, res) => {
    // posts = [...posts, ...data, ...req.body];
    posts = [...posts, req.body];
    res.send("new post successfully added");
  });
  */

/** data from mongoDB */
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

/* Local data */
/*
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/

/* Database data */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose.connect("mongodb://127.0.0.1:27017/database").then(() => {
    console.log("successfully connected to the database !");
  });
});
