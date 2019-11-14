const Post = require("../database/models/Post");

module.exports = (req, res, next) => {
  var perPage = 5;
  var page = req.params.page || 1;
  var title = "WeekyDay Blog | Home";
  Post.find({})
    .sort("-createdAt")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function(err, posts) {
      Post.countDocuments().exec(function(err, count) {
        if (err) return next(err);
        res.render("index", {
          posts: posts,
          current: page,
          pages: Math.ceil(count / perPage),
          title: title,
          auth: req.session.userId,
          username: req.session.username
        });
      });
    });
};
