const Post = require("../database/models/Post");
const fs = require("fs");

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const auth = req.session.userId;
  
  if (!post) {
    res.status(404);
    const title = "WeekyDay Blog | Kosonk?!";
    return res.render("notFound", { title });
  }
  // return res.redirect("/");

  ///delete img  
  //hacky hacky
  if (post.image !== "noImage") {
    let path = "public" + post.image;
    console.log(path);
    fs.unlink(path, function(err) {
      if (err) console.log(err);
    });
  }

  Post.findByIdAndDelete(req.params.id, function(err) {
    if (err) console.log(err);
    console.log("sukses delete " + post.title);
    res.redirect("/");
  });
};
