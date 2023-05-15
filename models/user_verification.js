const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const user = require("./user");

const User_verification = (sequelize) => {
  return sequelize.define("User_verification", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
User_verification.associate = (models) => {
  User_verification.belongsTo(models.user, {
    foreignKey: "user_id",
    as: "user_id",
  });
};
module.exports = User_verification;
