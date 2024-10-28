const {
  findPosts,
  // createPost,
  findOnePost,
  // findByIdAndUpdate,
  // findOnePostAndDelete,
} = require("../controllers/post");

module.exports = (postrouter) => {
  postrouter.get("/posts", findPosts);
  postrouter.get("/posts/:id", findOnePost);
  // router.post("/posts/create", createPost);
  // router.patch("/posts/update/:id", findByIdAndUpdate);
  // router.delete("/posts/delete/:id", findOnePostAndDelete);
};
