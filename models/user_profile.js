const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const User = require("./user");

const User_profile = (sequelize) => {
  return sequelize.define("User_profile", {
    user_id: {
      type: DataTypes.INTEGER,
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
};

module.exports = User_profile;
