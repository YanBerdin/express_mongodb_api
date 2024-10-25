const express = require('express')
const app = express()
//const port = 3000
const port = process.env.PORT || 3000;
const data = require("./posts");

app.use(express.json());

let posts = [];

app.get('/', (req, res) => {
  res.send('Hello Backend World!')
})

app.get("/posts", (req, res) => {
    const data_posts = [...posts, ...data];
    res.send(data_posts);
  });
  

app.post("/posts/create", (req, res) => {
    // posts = [...posts, ...data, ...req.body];
    posts = [...posts, req.body];
    res.send("new post successfully added");
  });
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

