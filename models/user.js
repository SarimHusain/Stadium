const Sequelize = require('sequelize')

module.exports = Sequelize.define("Seat", {

	Name: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
    
    Event: {
		type: Sequelize.STRING(10),
        allowNull: false
    }
    
});