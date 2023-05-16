const db = require("../models");
const User_profile = db.User_profile;
const User = db.User;
const path = require("path");
dotenv = require("dotenv").config({ path: path.resolve("../.env") });

//import
const jwt = require("jsonwebtoken");
const ProfileControllers = {
  // Controller untuk mendapatkan user profile berdasarkan ID user
  getUser_profile: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decodedToken = jwt.verify(token, process.env.signature);
      console.log(decodedToken);
      const user_id = decodedToken.id;
      console.log(user_id);

      // Cari user berdasarkan ID

      // Cari user profile berdasarkan ID user

      // Mengambil data user dengan kolom yang ditentukan
      const user = await User.findOne({
        where: { id: user_id },
        attributes: ["username", "fullname", "bio", "profile_pic"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Controller untuk mengupdate user profile
  updateUser_profile: async (req, res) => {
    try {
      const { userId } = req.params;
      const { bio, profilePic } = req.body;

      // Cari user berdasarkan ID
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Jika user profile sudah ada, update data
      user.bio = bio;
      user.profilePic = profilePic;
      await user.save();

      // Mengembalikan data user profile yang telah diupdate
      return res.status(200).json({ user_profile });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },

  editProfile: async (req, res) => {
    try {
      const { fullname, bio } = req.body;
      const userId = req.user.id; // Mengambil id pengguna dari token otentikasi

      // Mengambil data user_profile yang sesuai dengan user_id
      let user = await User.findOne({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User profile not found" });
      }

      // Mengupdate fullname dan bio
      user.fullname = fullname;
      user.bio = bio;

      // Jika ada file gambar diunggah, mengupdate profile_pic
      if (req.file) {
        user.profile_pic = req.file.filename;
      }

      // Menyimpan perubahan pada user_profile
      await user.save();

      return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = ProfileControllers;
