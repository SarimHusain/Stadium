const Sequelize = require('sequelize')

module.exports = Sequelize.define("Canteen", {

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
});