const {
  createPost,
  findOnePostAndUpdate,
  findOnePostAndDelete,
} = require("../controllers/post");

module.exports = (router) => {
  router.post("/posts/create", createPost);
  router.patch("/posts/update/:id", findOnePostAndUpdate);
  router.delete("/posts/delete/:id", findOnePostAndDelete);
};
