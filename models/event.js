const { Sequelize, DataTypes } = require('sequelize');
//onst sequelize = new Sequelize('sqlite::memory:');
const db = require('../Database');

const Event = db.define('Event', {
  // Model attributes are defined here
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  EID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  People: {
    type: DataTypes.INTEGER,
  },
  Cost: {
    type: DataTypes.INTEGER
  },
}, {
  // Other model options go here
});

Event.sync();

module.exports = Event;