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
User_profile.associate = (models) => {
  User_profile.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "Profile", // Gunakan alias "Profile" sebagai nama asosiasi yang sama
  });
};
module.exports = User_profile;
