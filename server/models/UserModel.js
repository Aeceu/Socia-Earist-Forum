const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    studentID: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

const Users = mongoose.models.users || mongoose.model("users", UserSchema);

module.exports = Users;
