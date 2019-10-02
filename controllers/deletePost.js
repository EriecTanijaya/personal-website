const Post = require("../database/models/Post");
const fs = require('fs');

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const auth = req.session.userId;
  if (!post || !auth){
    //show error
    //sementara redirect ke "/" dulu
    return res.redirect("/");
  }
  
  //delete img
  if (post.image !== undefined){
    let path = 'public' + post.image;
    console.log(path);
    fs.unlink(path, function(err){
      if (err) console.log(err);
    })
  }
  
  
  
  Post.findByIdAndDelete(req.params.id, function(err){
    if (err) console.log(err);
    console.log('sukse delete ' + post.title);
    res.redirect("/");
  });
  
};