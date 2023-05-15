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
      const user_profile = await User_profile.findOne({
        where: { user_id },
        raw: true,
        include: {
          model: User,
          attributes: ["username"],
          as: "username",
        },
      });

      if (!user_profile) {
        return res.status(404).json({ message: "User profile not found" });
      }

      // Mengembalikan data user profile
      return res.status(200).json({ user_profile });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
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

      // Cari atau buat user profile berdasarkan ID user
      let user_profile = await User_profile.findOne({ where: { userId } });

      if (!user_profile) {
        // Jika user profile belum ada, buat baru
        user_profile = await User_profile.create({ userId, bio, profilePic });
      } else {
        // Jika user profile sudah ada, update data
        user_profile.bio = bio;
        user_profile.profilePic = profilePic;
        await user_profile.save();
      }

      // Mengembalikan data user profile yang telah diupdate
      return res.status(200).json({ user_profile });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = ProfileControllers;
