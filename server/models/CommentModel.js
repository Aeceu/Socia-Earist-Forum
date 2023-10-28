const mongoose = require("mongoose");
const Users = require("./UserModel");
const Posts = require("./PostModel");

const commentsSchema = new mongoose.Schema(
  {
    creatorID: {
      type: mongoose.Schema.ObjectId,
      ref: Users,
    },
    postID: {
      type: mongoose.Schema.ObjectId,
      ref: Posts,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentsSchema);
module.exports = Comments;
