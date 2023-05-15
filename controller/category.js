const db = require("../models");
const Category = db.Category;

const CategoriesControllers = {
  findAllCategory: async (req, res) => {
    try {
      const Categories = await Category.findAll({ raw: true });
      return res.status(200).json({
        result: Categories,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statuscode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = CategoriesControllers;
