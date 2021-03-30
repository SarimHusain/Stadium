const Sequelize = require('sequelize')

module.exports = Sequelize.define("Employee", {
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
	}
});
99