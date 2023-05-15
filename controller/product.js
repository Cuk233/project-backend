const db = require("../models");
const Product = db.Product;
const Category = db.Category;

const productControllers = {
  findAllProduct: async (req, res) => {
    try {
      const Products = await Product.findAll({
        raw: true,
        include: {
          model: Category,
          attributes: ["category_name"],
          as: "Category",
        },
      });
      return res.status(200).json({
        result: Products,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statuscode || 500).json({
        message: err.message,
      });
    }
  },
  findProductsByCategory: async (req, res) => {
    try {
      const category_id = req.params.category_id;
      const Products = await Product.findAll({
        raw: true,
        where: {
          category_id: category_id,
        },
        include: {
          model: Category,
          attributes: ["category_name"],
        },
      });
      return res.status(200).json({
        result: Products,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statuscode || 500).json({
        message: err.message,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { name, category_id, price, stock } = req.body;

      const newProduct = await Product.create({
        name,
        category_id,
        price,
        stock,
      });

      return res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statuscode || 500).json({
        message: err.message,
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, category_id, price, stock } = req.body;

      const product = await Product.findOne({ where: { id: productId } });

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      product.name = name || product.name;
      product.category_id = category_id || product.category_id;
      product.price = price || product.price;
      product.stock = stock || product.stock;

      await product.save();

      return res.status(200).json({
        message: "Product updated successfully",
        product: product,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statuscode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = productControllers;
