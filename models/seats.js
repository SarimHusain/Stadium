const { Sequelize, DataTypes } = require('sequelize');
//onst sequelize = new Sequelize('sqlite::memory:');
const db = require('../Database');

const Seats = db.define('Seats', {
  // Model attributes are defined here
  Position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Filled: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
});

Seats.sync();

module.exports = Seats;