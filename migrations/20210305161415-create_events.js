'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Events", {
      Name: {
        type: Sequelize.STRING(20),
        allowNull: false 
      },
    
      Date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
    
      Cost: {
        type: Sequelize.INTEGER(5),
        autoIncrement: false
      },
    
      Number: {
        type: Sequelize.INTEGER(10),
        allowNull: true
      },
    
      EId: {
        type: Sequelize.INTEGER(5),
        allowNull: false
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Events")
  }
};
