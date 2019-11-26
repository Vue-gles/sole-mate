const db = require('./db');
const { User, Run, Request,Message } = require('./models');

// register models
require('./models');

module.exports = {
  db,
  User,
  Run,
  Request,
  Message
};
