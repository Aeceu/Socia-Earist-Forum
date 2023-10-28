const Users = require("../models/UserModel");
const getToken = require("../utils/getToken");

const UserData = async (req, res) => {
  const id = getToken(req);
  try {
    const user = await Users.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "Gets User Successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get userdata.",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "Gets User Successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get userdata.",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = req.body;
    const user = await Users.findById(id).select("-password");

    user.firstname = data.firstname;
    user.lastname = data.lastname;
    user.email = data.email;
    user.studentID = data.studentID;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Details updated Successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update userdata.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Users.findByIdAndRemove(id);
    res.status(200).json({
      success: true,
      message: "User deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get userdata.",
    });
  }
};
module.exports = {
  UserData,
  getUser,
  deleteUser,
  updateUser,
};
