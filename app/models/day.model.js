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
    });
    return Day;
  };
  
