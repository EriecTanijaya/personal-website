const Post = require('../database/models/Post')

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const title = 'WeekyDay Blog | ' + post.title;
  res.render('post', {post, title});
};