const express = require("express");
const {
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
  newPost,
  UserAllPosts,
  HandleLikes,
  getLikes,
} = require("../controller/PostController");

const router = express.Router();

router.get("/post/:id", getPost);
router.get("/post", getAllPosts);
router.get("/userposts/:id", UserAllPosts);
router.post("/post/:id", newPost);
router.delete("/post/:id", deletePost);
router.patch("/post/:id", updatePost);
router.post("/like", getLikes);
router.post("/like/:id", HandleLikes);
module.exports = router;
