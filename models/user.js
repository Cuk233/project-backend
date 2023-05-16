const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const User_profile = require("./user_profile");

const User = (sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    profile_pic: {
      type: DataTypes.STRING,
      defaultValue: "default.jpg",
    },
  });
  User.associate = (models) => {
    User.hasMany(models.content, {
      foreignKey: "User_id",
      as: "user", // Menambahkan alias "contents"
    });
  };

  return User;
};
module.exports = User;
