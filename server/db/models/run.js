const Sequelize = require('sequelize');
const db = require('../db');
const { Op } = require('sequelize');
const User = require('./user');
const axios = require('axios');
// require('../../../keys');
const {calculateDistance} = require('../../../utils')

const Run = db.define(
  'run',
  {
    street: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Prospect Park, Brooklyn, NY',
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Brooklyn',
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'NY',
      validate: {
        notEmpty: true,
      },
    },
    lat: {
      type: Sequelize.FLOAT,
    },
    long: {
      type: Sequelize.FLOAT,
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
    route: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    distance: {
      type: Sequelize.FLOAT
    },
    prefferedMileage: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, 
);


Run.getPotentialRuns = function(userId, maxDistance, lat, long) {
  console.log('ARE WE EVEN HERE???')
  const currentTime = new Date();
  const runs = Run.findAll({
    where: {
      creatorId: { [Op.ne]: userId },
      endTimeframe: { [Op.gt]: currentTime },
      partnerId: { [Op.is]: null }
    },
    include: [{ model: User, as: 'Creator' }],
  });
  if (!maxDistance) {
    console.log('HOW ABOUT HEREEE', maxDistance)
    return runs
  }
  else {
    const runsWithinDistance = runs.filter( run => {
      const distanceBetweenPoints = calculateDistance(lat, long, run.lat, run.long)
      if (distanceBetweenPoints < maxDistance) return run
    })
    return runsWithinDistance
  }
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

module.exports = Run;
