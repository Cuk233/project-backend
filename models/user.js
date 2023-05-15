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
  });
  User.associate = (models) => {
    User.hasMany(models.User_profile, {
      foreignKey: "user_id",
      as: "Profile",
    });
    User.hasOne(models.User_profile, {
      foreignKey: "user_id",
    });
  };
  return User;
};
module.exports = User;
