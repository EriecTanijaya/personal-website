const path = require("path");
const Post = require("../database/models/Post");
const sharp = require("sharp");

module.exports = (req, res) => {
  if (req.files !== null) {
    const { image } = req.files;
    let imgTitle = req.body.title.replace(/\s/g, "_");
    let outputImageName = "img_" + imgTitle + ".webp";
    
    let imagePath = path.resolve(__dirname, "..", "public/posts", outputImageName);
    console.log("skrg di storePost");
    //to webp
    sharp(image.data)
      .webp()
      .toFile(imagePath, function(err, info) {
      if (err) console.log(err);
      console.log("sharp info", info);
    });
    console.log("req.files.image", image);
    Post.create(
      {
        ...req.body,
        image: `/posts/${outputImageName}`
      },
      (error, post) => {
       return res.redirect("/");
      }
    );
  } else {
    Post.create(
      //hacky hacky
      { ...req.body, image: "noImage" },
      (error, post) => {
        return res.redirect("/");
      }
    );
  }
};
