const db = require('./db');
const { User, Run, Request } = require('./models');

// register models
require('./models');

module.exports = {
  db,
  User,
  Run,
  Request,
};
