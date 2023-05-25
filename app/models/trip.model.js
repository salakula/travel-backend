module.exports = (sequelize, Sequelize) => {
    const Trip = sequelize.define("trip", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
  
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
  
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
    return Trip;
  };
  