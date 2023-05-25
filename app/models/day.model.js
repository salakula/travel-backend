module.exports = (sequelize, Sequelize) => {
    const Day = sequelize.define("day", {
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      weekday: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      hotelName: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      hotelAddress: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      hotelPhone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      hotelLink: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });
    return Day;
  };
  