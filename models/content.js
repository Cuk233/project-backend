// models/Content.js
const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const User = require("./user");

const Content = (sequelize) => {
  const Content = sequelize.define("content", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Content.associate = (models) => {
    Content.belongsTo(models.User, {
      foreignKey: "User_id",
      as: "user",
    });
  };

  return Content;
};
module.exports = Content;
