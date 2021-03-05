'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Employees", {
      Name: {
        type: Sequelize.STRING(20),
        allowNull: false 
      },
    
      Age: {
        type: Sequelize.INTEGER(2),
        allowNull: false
      },
    
      EmpId: {
        type: Sequelize.INTEGER(5),
        autoIncrement: true
      },
    
      Address: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
    
      DOB: {
        type: Sequelize.DATEONLY(),
        allowNull: false
      },
    
      DateofJoining: {
        type: Sequelize.DATEONLY(),
        allowNull: false
      },
    
      Section: {
        type: Sequelize.STRING(6),
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Employees")
  }
};
