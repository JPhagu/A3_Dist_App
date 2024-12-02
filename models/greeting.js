const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db'); // Adjust the path as needed

const greeting = sequelize.define('Greeting', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  timeOfDay: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  greetingMessage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Greetings',
  timestamps: false, // Set to true if you want createdAt/updatedAt fields
});

// Export the model
module.exports = greeting;