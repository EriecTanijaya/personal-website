const Post = require("../database/models/Post");

module.exports = (req, res, next) => {
  var title = "WeekyDay Blog | Search";
  var input = req.query.input;
  
  if (input === "") {
    return res.redirect("/search");
  }

  var perPage = 5;
  var page = req.query.page || 1;
  var found = false;
  Post.find({
    $text: { $search: input }
  })
    .sort("-createdAt")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function(err, posts) {
      if (posts.length !== 0) {
        found = true;
      }
      Post.countDocuments({
        $text: { $search: input }
      }).exec(function(err, count) {
        if (err) return next(err);
        res.render("searchResult", {
          search: {
            input: input,
            found: found
          },
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
