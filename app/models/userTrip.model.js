const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const UserTrip = sequelize.define("userTrip", {
    selfGranted: DataTypes.BOOLEAN
  }, { timestamps: false });
  return UserTrip;
};
