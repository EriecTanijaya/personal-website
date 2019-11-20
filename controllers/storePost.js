const path = require("path");
const Post = require("../database/models/Post");

module.exports = (req, res) => {
  if (req.files !== null) {
    const { image } = req.files;
    image.name = image.name.replace(/\s/g, "_");
    image.mv(
      path.resolve(__dirname, "..", "public/posts", image.name),
      error => {
        Post.create(
          {
            ...req.body,
            image: `/posts/${image.name}`
          },
          (error, post) => {
            res.redirect("/");
          }
        );
      }
    );
  } else {
    Post.create(
      //hacky hacky
      { ...req.body, image: "noImage"},
      (error, post) => {
        res.redirect("/");
      }
    );
  }
};
