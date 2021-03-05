'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.createTable("Canteens", {

    Food_Items: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
  
    CostItem: {
      type: Sequelize.INTEGER(10),
      allowNull: false
    },
  
    ItemId: {
      type: Sequelize.INTEGER(5)
    },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
   })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Canteens")
  }
};
