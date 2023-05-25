module.exports = (sequelize, Sequelize) => {
    const Place = sequelize.define("place", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      link: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    });
    return Place;
  };
  