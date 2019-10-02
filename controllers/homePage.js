const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  
  //TODO: buat pagination system, jadi posts ini, kasih sampai 5 length aja
  //pas tekan show older post, buatlah itu nama_web.com/p/1 -> ini utk homepage
  
  const posts = await Post.find({});
  const auth = req.session.userId;
  const title = "WeekyDay Blog | Home";
  res.render("index", { posts, auth, title });
};
