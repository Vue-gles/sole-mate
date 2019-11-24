const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const Run = require('./run');

const Request = db.define('request', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'accepted', 'rejected']],
    },
  },
});

Request.getOutgoing = function(requesterId) {
  try {
    const outgoing = Request.findAll({
      where: {
        requesterId,
      },
      include: [{ model: Run, include: [{ model: User, as: 'Creator' }] }],
    });
    return outgoing;
  } catch (error) {
    console.log('Error:', error);
  }
};

Request.getIncoming = function(creatorId) {
  try {
    const incoming = Request.findAll({
      include: [
        {
          model: User,
          as: 'Request',
        },
        {
          model: Run,
          where: { creatorId },
        },
      ],
    });
    return incoming;
  } catch (error) {
    console.log('Error:', error);
  }
};

Request.addNew = function(requesterId, runId) {
  try {
    const newRequest = Request.findOrCreate({
      where: {
        requesterId: requesterId,
        runId: runId,
      },
      defaults: {
        status: 'pending',
      },
    });
    return newRequest;
  } catch (error) {
    console.log('Error:', error);
  }
};

Request.updateRequestStatus = function(runId, requesterId, status) {
  const updatedRequest = Request.update(
    {
      status: status,
    },
    {
      where: {
        runId: runId,
        requesterId: requesterId,
      },
    }
  );
  return updatedRequest;
};

module.exports = Request;
