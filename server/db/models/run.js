const Sequelize = require('sequelize');
const db = require('../db');
const { Op } = require('sequelize');
const User = require('./user');
const axios = require('axios');
// require('../../../keys');

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
    prefferedMileage: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  // {
  //   hooks: {
  //     //this doesn't work yet
  //     beforeValidate: async function(run) {
  //       if (!run.lat || !run.long) {
  //         const fullAddress = `${run.street}, ${run.city}, ${run.state}`;
  //         const {data} = await axios.get(
  //           `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${process.env.GOOGLE_API_KEY}`
  //         );
  //         const lat = data.results[0].geometry.location.lat;
  //         const long = data.results[0].geometry.location.lng;
  //         run.lat = lat;
  //         run.long = long;
  //       }
  //     },
  //   },
  // }
);

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

module.exports = Run;
