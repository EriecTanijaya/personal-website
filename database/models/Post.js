const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  username: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  comments: [
    {
      username: String,
      content: String,
      createdAt: {
        type: Date,
        default: new Date()
      }
    }
  ]
});

PostSchema.index(
  {
    title: "text",
    description: "text",
    content: "text",
    username: "text"
  },
  {
    weights: {
      title: 5,
      description: 3,
      content: 2,
      username: 1
    }
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
