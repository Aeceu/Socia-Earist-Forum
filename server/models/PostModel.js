const mongoose = require("mongoose");
const Users = require("./UserModel");

const PostSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: Users,
    },
    title: String,
    description: String,
    category: String,
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: Users,
      },
    ],
    comments: [
      {
        comment: String,
        commentor: {
          type: mongoose.Schema.ObjectId,
          ref: Users,
        },
      },
    ],
  },
  { timestamps: true }
);

const Posts = mongoose.models.posts || mongoose.model("posts", PostSchema);

module.exports = Posts;
