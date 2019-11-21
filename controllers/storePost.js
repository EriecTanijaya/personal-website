const path = require("path");
const Post = require("../database/models/Post");
const sharp = require("sharp");

module.exports = (req, res) => {
  if (req.files !== null) {
    const { image } = req.files;
    
    //its utc timezone (universal)
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    let outputImageName = "img_" + dateTime + ".webp";
    
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
