const Post = require('../database/models/Post')

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const auth = req.session.userId;
  const title = 'WeekyDay Blog | ' + post.title;
  res.render('post', {post, title, auth});
};