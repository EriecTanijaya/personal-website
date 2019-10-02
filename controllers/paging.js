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
        var pages = Math.ceil(count / perPage);
        
        //kalau page 0/ minus dan kalau berlebihan
        if (page < 1 || page > pages){
          return res.redirect('/');
        }
        if (err) return next(err)
        res.render('index', {
          posts: posts,
          current: page,
          pages: pages,
          title: title,
          auth: req.session.userId
        })
      })
    })
}