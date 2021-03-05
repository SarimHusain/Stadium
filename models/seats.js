const Sequelize = require('sequelize')

module.exports = Sequelize.define("Seat", {

	Position: {
		type: Sequelize.STRING(5),
		allowNull: false
	},

	Filled: {
		type: Sequelize.CHAR,
		allowNull: true
	}
});