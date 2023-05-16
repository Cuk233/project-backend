const { ProfileControllers } = require("../controller");
const upload = require("../middlewares/uploadMiddleware");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

// Menggunakan middleware authMiddleware untuk memeriksa otentikasi pengguna
router.put(
  "/edit",
  authMiddleware,
  uploadMiddleware.single("profile_pic"),
  ProfileControllers.editProfile
);
router.get("/view", ProfileControllers.getUser_profile);
module.exports = router;
