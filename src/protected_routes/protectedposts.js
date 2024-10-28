const {
  createPost,
  findOnePostAndUpdate,
  findOnePostAndDelete,
} = require("../controllers/post");

// Middleware
function loginRequired(req, res, next) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized user, Please register a new account or login",
    });
  }
  next();
}

module.exports = (protectedrouter) => {
  protectedrouter.post("/posts/create", createPost);
  protectedrouter.patch("/posts/update/:id", findOnePostAndUpdate);
  protectedrouter.delete("/posts/delete/:id", findOnePostAndDelete);
};
