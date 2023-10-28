const Posts = require("../models/PostModel");

const addComment = async (req, res) => {
  const { comment, postID, userID } = req.body;
  try {
    const post = await Posts.findByIdAndUpdate(
      postID,
      {
        $push: { comments: { comment: comment, commentor: userID } },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "new comment added!",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add comment.",
    });
  }
};

const getPostComment = async (req, res) => {
  const postID = req.params.id;
  try {
    const post = await Posts.findById(postID).populate({
      path: "comments.commentor",
      select: "-password",
    });
    res.status(200).json({
      success: true,
      message: "Comments fetched!!",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments.",
    });
  }
};

module.exports = { addComment, getPostComment };
