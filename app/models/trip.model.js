module.exports = (sequelize, Sequelize) => {
    const Trip = sequelize.define("trip", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      startDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      endDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
    return Trip;
  };
  
