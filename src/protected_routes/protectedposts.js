const {
  createPost,
  findOnePostAndUpdate,
  findOnePostAndDelete,
} = require("../controllers/post");

module.exports = (protectedrouter) => {
  protectedrouter.post("/posts/create", createPost);
  protectedrouter.patch("/posts/update/:id", findOnePostAndUpdate);
  protectedrouter.delete("/posts/delete/:id", findOnePostAndDelete);
};
