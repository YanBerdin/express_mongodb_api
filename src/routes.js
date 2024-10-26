const {
    findPosts,
    createPost,
    findOnePost,
    findByIdAndUpdate,
    findOnePostAndDelete,
  } = require("./controllers/post");
  
  module.exports = (router) => {
    router.get("/posts", findPosts);
    router.get("/posts/:id", findOnePost);
    router.post("/posts/create", createPost);
    router.patch("/posts/update/:id", findByIdAndUpdate);
    router.delete("/posts/delete/:id", findOnePostAndDelete);
  };
