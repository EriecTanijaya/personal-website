const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    //TODO: buat 404
    return res.redirect("/");
  }
  const auth = req.session.username;
  const title = "WeekyDay Blog | " + post.title;
  res.render("post", { post, title, auth });
};
