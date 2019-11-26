const Sequelize = require('sequelize');
const db = require('../db');
const { Op } = require('sequelize');
const User = require('./user');

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

Run.getPotentialRuns = function(userId) {
  const currentTime = new Date();
  const runs = Run.findAll({
    where: {
      creatorId: { [Op.ne]: userId },
      endTimeframe: { [Op.gt]: currentTime },
      partnerId: { [Op.is]: null },
    },
    include: [{ model: User, as: 'Creator' }],
  });
  return runs;
};

Run.getUpcomingRuns = function(userId) {
  const currentTime = new Date();
  const runs = Run.findAll({
    where: {
      endTimeframe: { [Op.gt]: currentTime },
      [Op.or]: [
        {
          creatorId: userId,
        },
        {
          partnerId: userId,
        },
      ],
    },
    include: [{ model: User, as: 'Creator' }],
  });
  return runs;
};

Run.getPastRuns = function(userId) {
  const currentTime = new Date();
  const runs = Run.findAll({
    where: {
      endTimeframe: { [Op.lte]: currentTime },
      [Op.or]: [
        {
          creatorId: userId,
        },
        {
          partnerId: userId,
        },
      ],
    },
    include: [{ model: User, as: 'Creator' }],
  });
  return runs;
};
