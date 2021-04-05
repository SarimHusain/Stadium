const { Sequelize, DataTypes } = require('sequelize');
const db = require('../Database');
const Seats = require('./seats');
const Seat = require('./seats');
// const Seat = require('./seats')

const Employee = db.define('Employee', {
  // Model attributes are defined here
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  EmpID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  Address: {
    type: DataTypes.STRING,
  },
  DateofJoining: {
    type: DataTypes.STRING
  },
  Section: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
});


Employee.sync();
// Employee.associate = function (models) {
//   Employee.hasMany(models.seats, {as: 'seats', foreignKey: 'seatId'})  
// }

//Employee.hasMany(Seats,{foreignKey: 'E_ID'})  
module.exports = Employee;