const Post = require('../database/models/Post')

module.exports = async (req, res) => {
  const posts = await Post.find({});
  const auth = req.session.userId;
  res.render('index', {posts, auth});
}