const Sequelize = require('sequelize');
const db = require('../db');

const Run = db.define('run', {
  locationName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Prospect Park, Brooklyn, NY',
    validate: {
      notEmpty: true,
    },
  },
  startTimeframe: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  endTimeframe: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  partnerId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Run;
