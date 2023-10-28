const Posts = require("../models/PostModel");

const getPost = async (req, res) => {
  try {
    const postID = req.params.id;
    const post = await Posts.findOne({ _id: postID }).populate({
      path: "creator",
      select: "-password",
    });
    res.status(200).json({
      success: true,
      message: "Fetch all post successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch  post.",
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({}).populate({
      path: "creator",
      select: "-password",
    });

    res.status(200).json({
      success: true,
      message: "Fetch all posts successfully",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all posts.",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const postID = req.params.id;
    const { data } = req.body;
    const post = await Posts.findOne({ _id: postID }).populate({
      path: "creator",
      select: "-password",
    });

    post.title = data.title;
    post.description = data.description;
    post.category = data.category;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Update post successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all posts.",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const postID = req.params.id;
    await Posts.findByIdAndRemove({ _id: postID });

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all posts.",
    });
  }
};

const newPost = async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = req.body;
    const post = await new Posts({
      creator: id,
      category: data.category,
      title: data.title,
      description: data.description,
    });

    await post.save();
    res.status(200).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create  post.",
    });
  }
};

const UserAllPosts = async (req, res) => {
  try {
    const id = req.params.id;

    const AllPosts = await Posts.find({}).populate({
      path: "creator",
      select: "-password",
    });
    const userposts = AllPosts.filter(
      (post) => post.creator._id.toString() === id
    );
    res.status(200).json({
      success: true,
      message: "Fetch user all posts successfully",
      userposts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all posts.",
    });
  }
};

const getLikes = async (req, res) => {
  const { userID, postID } = req.body;
  try {
    const post = await Posts.findById(postID);
    const isLiked = post.likes.some((like) => like.toString() === userID);
    res.status(200).json({ count: post.likes.length, isLiked });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get like count of posts.",
    });
  }
};

const HandleLikes = async (req, res) => {
  const postID = req.params.id;
  const { likerID } = req.body;
  try {
    const post = await Posts.findById(postID);

    const existingLikeIndex = post.likes.findIndex(
      (like) => like.toString() === likerID
    );

    if (existingLikeIndex !== -1) {
      post.likes.splice(existingLikeIndex, 1); // Remove the existing like (user ID)
    } else {
      // Push the new like (user ID) only if it's not already in the array
      if (!post.likes.includes(likerID)) {
        post.likes.push(likerID);
      }
    }

    await post.save(); // Save the updated post with modified likes array
    res.status(200).json({ post: post.likes.length, allpost: post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to like  posts.",
    });
  }
};

module.exports = {
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
  newPost,
  UserAllPosts,
  getLikes,
  HandleLikes,
};
