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

Request.updateRequestStatus = function(runId, requesterId, status) {
  const updatedRequest = Request.update(
    {
      status: status,
    },
    {
      where: {
        runId: runId,
        requesterId: requesterId,
      }
    })
    return updatedRequest
}

module.exports = Request;
