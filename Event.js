const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clubId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clubs',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('upcoming', 'recent'),
    allowNull: false
  },
  maxParticipants: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currentParticipants: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Event;
