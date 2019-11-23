const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    const title = "WeekyDay Blog | Kosonk?!";
    return res.render("notFound", { title: title, auth: req.session.userId });
  }

  const auth = req.session.username;
  const title = "WeekyDay Blog | " + post.title;
  let today = new Date();
  //to compare later
  today.setHours(0, 0, 0, 0);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  post.comments.forEach((item, index) => {
    //default
    item.time = item.createdAt.toLocaleTimeString("id-ID", {
      timeZone: "Asia/Jakarta"
    });

    if (item.createdAt < today) {
      item.time = item.createdAt.toLocaleDateString("en-EN", options);
    }
  });

  return res.render("post", { post, title, auth });
};
