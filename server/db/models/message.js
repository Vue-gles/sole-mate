const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

Message.getAllMessages = function(userId) {
  try {
    const messages = Message.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
      include: [
        { model: User, as: 'Sender', foreignKey: 'senderId' },
        { model: User, as: 'Receiver', foreignKey: 'receiverId' },
      ],
      order: [['createdAt', 'DESC']],
    });
    return messages;
  } catch (error) {
    console.log('Error:', error);
  }
};

Message.getAllThreads = function(messages, userId) {
  let threads = [];
  let threadKey = {};
  messages.forEach(message => {
    if (message.senderId !== userId) {
      if (!threadKey[message.Sender.id]) {
        threadKey[message.Sender.id] = true;
        threads.push(message.Sender);
      }
    } else {
      if (!threadKey[message.Receiver.id]) {
        threadKey[message.Receiver.id] = true;
        threads.push(message.Receiver);
      }
    }
  });
  return threads;
};

Message.getThreadMessages = function(userId, partnerId) {
  try {
    const messages = Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId: partnerId },
          { senderId: partnerId, receiverId: userId },
        ],
      },
      include: [{ model: User, as: 'Sender', foreignKey: 'senderId' }],
      order: [['createdAt', 'ASC']],
    });
    return messages;
  } catch (error) {
    console.log('Error:', error);
  }
};
