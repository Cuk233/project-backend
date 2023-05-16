const multer = require("multer");

// Mengatur penyimpanan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "D:/Bootcamp/project/project-frontend/public/images/profile"); // Ganti dengan path folder tempat menyimpan gambar
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg"); // Mengatur nama file dengan timestamp
  },
});

// Mengatur filter untuk hanya mengizinkan jenis file gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG images are allowed"), false);
  }
};

// Menggunakan multer middleware dengan konfigurasi penyimpanan dan filter
const uploadMiddleware = multer({ storage: storage, fileFilter: fileFilter });

module.exports = uploadMiddleware;
