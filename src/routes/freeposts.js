const { check, validationResult } = require("express-validator");

const {
  findPosts,
  // createPost,
  findOnePost,
  // findByIdAndUpdate,
  // findOnePostAndDelete,
} = require("../controllers/post");

module.exports = (postrouter) => {
  postrouter.get("/posts", findPosts);

  // postrouter.get("/posts/:id", findOnePost);
  // check("id").isMongoId() => check si ID est un id MongoDB  trim() => supprime espaces en debut et fin de string  escape() => supprime les caractères spéciaux
  postrouter.get(
    "/posts/:id",
    [check("id").isMongoId().withMessage("Invalid post ID").trim().escape()],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      findOnePost(req, res, next);
    }
  );
  // router.post("/posts/create", createPost);
  // router.patch("/posts/update/:id", findByIdAndUpdate);
  // router.delete("/posts/delete/:id", findOnePostAndDelete);
};
