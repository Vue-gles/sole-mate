const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const Run = require('./run');
const Request = require('./request');

const Message = db.define('message', {
  content: {
    type: Sequelize.STRING,
    defaultValue: 'hi',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Message;
