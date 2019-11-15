const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    const title = "WeekyDay Blog | Kosonk?!";
    return res.render("notFound", { title });
  }
  const auth = req.session.username;
  const title = "WeekyDay Blog | " + post.title;
  res.render("post", { post, title, auth });
};
