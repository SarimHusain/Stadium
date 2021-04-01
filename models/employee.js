const { Sequelize, DataTypes } = require('sequelize');
const db = require('../Database');

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

module.exports = Employee;