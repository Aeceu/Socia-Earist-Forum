const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/UserModel");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: maxAge,
  });
  return token;
};

const HandleLogin = async (req, res) => {
  try {
    const { data } = req.body;
    const user = await Users.findOne({ studentID: data.studentID });
    if (!user) {
      return res.status(500).json({
        success: false,
        error: "User does not exist!",
      });
    }

    const verifyPassword = await bcrypt.compare(data.password, user.password);

    if (!verifyPassword) {
      return res.status(500).json({
        success: false,
        error: "Password doesn't match!",
      });
    }

    const token = createToken(user._id.toString());
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 30 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return res.status(200).json({
      success: true,
      message: "User Authenticated!",
      token,
      id: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering the user.",
      error: error.message, // Include the actual error message for debugging
    });
  }
};

const HandleRegister = async (req, res) => {
  const { data } = req.body;
  try {
    if (
      !data.email ||
      !data.password ||
      !data.firstname ||
      !data.lastname ||
      !data.password
    ) {
      return res.status(500).json({
        success: false,
        error: "Fill up all the input field!",
      });
    }
    const user = await Users.findOne({ studentID: data.studentID });
    // check if email already registered
    if (user) {
      return res.status(500).json({
        success: false,
        message: "Student number already used!",
      });
    }
    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = new Users({
      studentID: data.studentID,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User registered!",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering the user.",
      error: error.message, // Include the actual error message for debugging
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.send("cookie removed");
};

module.exports = { HandleLogin, HandleRegister, logout };
