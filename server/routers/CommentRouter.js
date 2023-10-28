const express = require("express");
const {
  addComment,
  getPostComment,
} = require("../controller/CommentController");

const router = express.Router();

router.get("/comment/:id", getPostComment);
router.post("/comment", addComment);

module.exports = router;
