module.exports = (sequelize, Sequelize) => {
    const TripPlace = sequelize.define("tripPlace", {
      duration: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
    return TripPlace;
  };
  