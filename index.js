const express = require('express')
const app = express()
const mongoose = require("mongoose");
const Post = require("./models");
//const port = 3000
const port = process.env.port || 3000;
const data = require("./posts");
const helmet = require('helmet');

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

app.get('/', (req, res) => {
  res.send('Hello Backend Express World!')
})

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

  /*
app.post("/posts/create", (req, res) => {
    // posts = [...posts, ...data, ...req.body];
    posts = [...posts, req.body];
    res.send("new post successfully added");
  });
  */

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
      const post = await Post.curl -X PUT \
      http://localhost:3000/posts/update/671c24df7cd00c103b2ec021 \
      -H 'Content-Type: application/json' \
      -d '{
        "title": "updated post",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus lacus in lorem interdum, at mollis sem consequat. Vestibulum tempus fermentum justo, id molestie risus rhoncus ac. Phasellus augue purus, finibus non posuere molestie, laoreet at metus. Nam posuere non tellus nec laoreet. Etiam eu blandit lacus.",
        "created_at": "2020-01-01T00:00:00.000Z",
        "author": "John Doe"
      }'(query, update);
      post.save();
      res.send("new post successfully edited");
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  });

/*
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose.connect("mongodb://127.0.0.1:27017/database").then(() => {
    console.log("successfully connected to the database !");
  });
});
