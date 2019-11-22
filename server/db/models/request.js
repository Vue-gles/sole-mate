const Sequelize = require('sequelize');
const db = require('../db');

const Request = db.define('request', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'accepted', 'rejected']],
    },
  },
});

module.exports = Request;
