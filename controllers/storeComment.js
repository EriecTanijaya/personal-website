const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const auth = req.session.userId;
  
  if (!post) {
    res.status(404);
    const title = "WeekyDay Blog | Kosonk?!";
    return res.render("notFound", { title: title, auth: req.session.userId });
  }
  
  const {username, content} = req.body;
  const comment = {
    username: username,
    content: content
  }

  Post.findByIdAndUpdate(req.params.id, {$push: {comments: comment}}, {safe: true, upsert: true}, function(err) {
    if (err) console.log(err);
    res.redirect("/post/" + req.params.id);
  });
};
