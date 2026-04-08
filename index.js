const sequelize = require('../config/database');
const User = require('./User');
const Club = require('./Club');
const Event = require('./Event');
const Registration = require('./Registration');

// Define associations
User.hasMany(Registration, { foreignKey: 'userId' });
Registration.belongsTo(User, { foreignKey: 'userId' });

Event.hasMany(Registration, { foreignKey: 'eventId' });
Registration.belongsTo(Event, { foreignKey: 'eventId' });

Club.hasMany(Event, { foreignKey: 'clubId' });
Event.belongsTo(Club, { foreignKey: 'clubId' });

module.exports = {
  sequelize,
  User,
  Club,
  Event,
  Registration
};
