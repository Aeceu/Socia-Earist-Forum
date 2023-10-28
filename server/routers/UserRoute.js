const express = require("express");
const { HandleLogin, HandleRegister, logout } = require("../controller/Auth");
const {
  UserData,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/UserController");
const router = express.Router();

router.post("/login", HandleLogin);
router.get("/logout", logout);
router.post("/register", HandleRegister);
router.get("/userdata", UserData);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
