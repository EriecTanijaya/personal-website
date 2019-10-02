const Post = require("../database/models/Post");

module.exports = (req, res, next) => {
  var perPage = 5;
  var page = parseInt(req.params.page);
  
  var title = "WeekyDay Blog | Blogs";
  Post
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function (err, posts){
      Post.countDocuments().exec(function (err, count){
        if (err) return next(err)
        res.render('index', {
          posts: posts,
          current: page,
          pages: Math.ceil(count / perPage),
          title: title
        })
      })
    })
}