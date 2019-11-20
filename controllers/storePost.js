const path = require("path");
const Post = require("../database/models/Post");
const sharp = require("sharp");

module.exports = (req, res) => {
  if (req.files !== null) {
    const { image } = req.files;
    image.name = image.name.replace(/\s/g, "_");
    
    let outputImageName = image.name + "_web";
    
    let imagePath = path.resolve(__dirname, "..", "public/posts", outputImageName);
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
        res.redirect("/");
      }
    );
  } else {
    Post.create(
      //hacky hacky
      { ...req.body, image: "noImage" },
      (error, post) => {
        res.redirect("/");
      }
    );
  }
};
