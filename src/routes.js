const {
    findPosts,
    createPost,
    findOnePost,
    findOnePostAndUpdate,
    findOnePostAndDelete,
  } = require("./controllers/post");
  
  module.exports = (router) => {
    router.get("/posts", findPosts);
    router.get("/posts/:id", findOnePost);
    router.post("/posts/create", createPost);
    router.put("/posts/update/:id", findOnePostAndUpdate);
    router.delete("/posts/delete/:id", findOnePostAndDelete);
  };
  