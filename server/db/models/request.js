const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const Run = require('./run');
const Message = require('./message');

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
      where: {
        status: 'pending',
      },
      include: [
        {
          model: User,
          as: 'Requester',
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

Request.updateRequestStatus = function(creatorId, runId, requesterId, status) {
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
  if (status === 'accepted') {
    // Add partnerId to scheduled run
    Run.findByPk(runId).then(run => run.update({ partnerId: requesterId }));

    // Start message thread between users
    Message.create({
      senderId: creatorId,
      receiverId: requesterId,
      content: 'Your run request was accepted!',
    });

    // If user accepts a partner, reject all other requests for that run
    const Op = Sequelize.Op;
    Request.update(
      { status: 'rejected' },
      {
        where: {
          runId: runId,
          requesterId: {
            [Op.ne]: requesterId,
          },
        },
      }
    );
  }
  return updatedRequest;
};

module.exports = Request;
