'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.createTable("Seats", {
    Position: {
      type: Sequelize.STRING(5),
      allowNull: false
    },
  
    Filled: {
      type: Sequelize.CHAR,
      allowNull: true
    },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
   });
  },

  down: async (queryInterface, Sequelize) => {
  return queryInterface.dropTable("Seats")
  }
};
