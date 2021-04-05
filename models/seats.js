const { Sequelize, DataTypes } = require('sequelize');
//onst sequelize = new Sequelize('sqlite::memory:');
const db = require('../Database');
const Employee = require('./employee');

const Seats = db.define('Seats', {
  // Model attributes are defined here
  Position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Filled: {
    type: DataTypes.STRING
  },
  E_ID: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    foreignKey: true
  }
}, {
  // Other model options go here
});



Seats.sync();
// Seats.associate = function (models) {
//   Seats.belongsTo(models.employee, {as: 'seatss', foreignKey: 'Id'})  
// }

Seats.belongsTo(Employee)  
module.exports = Seats;