const { Sequelize, DataTypes } = require('sequelize');
//onst sequelize = new Sequelize('sqlite::memory:');
const db = require('../Database');

const User = db.define('User', {
  // Model attributes are defined here
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Event: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});

User.sync();

module.exports = User;