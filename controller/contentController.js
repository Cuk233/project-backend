const db = require("../models");
const Content = db.content;
const User = db.User;
const path = require("path");
dotenv = require("dotenv").config({ path: path.resolve("../.env") });
const jwt = require("jsonwebtoken");

// Mendapatkan semua konten
const ContentControllers = {
  getAllContents: async (req, res) => {
    try {
      const page = req.query.page || 1; // Mendapatkan nilai parameter halaman, defaultnya adalah 1
      const limit = 10; // Batas konten yang akan dikembalikan pada setiap halaman
      const offset = (page - 1) * limit; // Menghitung offset berdasarkan halaman dan batas

      // Mengambil data konten dari database dengan batas dan offset yang telah dihitung
      const contents = await Content.findAll({
        limit,
        offset,
        include: [
          {
            model: User,
            attributes: ["username", "profile_pic"],
            as: "user",
          },
        ],
        order: [["createdAt", "DESC"]], // Mengurutkan berdasarkan tanggal, sesuaikan dengan kolom tanggal pada model Content
      });

      res.json(contents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Mendapatkan satu konten berdasarkan ID
  getContentById: async (req, res) => {
    const { id } = req.params;
    try {
      const content = await Content.findByPk(id);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      return res.json(content);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Menambah konten baru
  createContent: async (req, res) => {
    const { title, description, image } = req.body;
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.signature);
      const userId = decodedToken.id;
      console.log(userId);
      const content = await Content.create({
        title,
        description,
        image,
        User_id: userId,
      });
      return res.status(201).json(content);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Mengedit konten
  updateContent: async (req, res) => {
    const { id } = req.params;
    const { title, description, image } = req.body;
    try {
      const content = await Content.findByPk(id);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      content.title = title;
      content.description = description;
      content.image = image;
      await content.save();
      return res.json(content);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Menghapus konten
  deleteContent: async (req, res) => {
    const { id } = req.params;
    try {
      const content = await Content.findByPk(id);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      await content.destroy();
      return res.json({ message: "Content deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = ContentControllers;
