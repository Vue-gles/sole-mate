const router = require('express').Router();
const { Request, Run, User, Message } = require('../db');
const { isAdmin, isUser } = require('../../utils');
const Op = require('sequelize').Op;
const { Expo } = require('expo-server-sdk');
// Create a new Expo SDK client
let expo = new Expo();
module.exports = router;

// GET /api/messages
// Returns all messages threads for a user
router.get('/', isUser, async (req, res, next) => {
  try {
    const messages = await Message.getAllMessages(req.user.id);
    const threads = await Message.getAllThreads(messages, req.user.id);
    res.send(threads);
  } catch (err) {
    next(err);
  }
});

// GET /api/messages/:partnerId
// Returns all messages between user and another person
router.get('/:partnerId', isUser, async (req, res, next) => {
  try {
    const messages = await Message.getThreadMessages(
      req.user.id,
      req.params.partnerId
    );
    res.send(messages);
  } catch (err) {
    next(err);
  }
});

// POST /api/messages/:partnerId
router.post('/:partnerId', isUser, async (req, res, next) => {
  try {
    await Message.sendMessage(
      req.user.id,
      req.params.partnerId,
      req.body.content
    );
    const updatedMessages = await Message.getThreadMessages(
      req.user.id,
      req.params.partnerId
    );
    const user = await User.findByPk(req.user.id);
    const partner = await User.findByPk(req.params.partnerId);

    if (partner.token) {
      const messages = [];
      messages.push({
        to: partner.token,
        sound: 'default',
        title: `New message from ${user.firstName} ${user.lastName}`,
        body: req.body.content,
        data: {
          title: `New message from ${user.firstName} ${user.lastName}`,
          body: req.body.content,
        },
        _displayInForeground: true,
      });

      // The Expo push notification service accepts batches of notifications so
      // that you don't need to send 1000 requests to send 1000 notifications. We
      // recommend you batch your notifications to reduce the number of requests
      // and to compress them (notifications with similar content will get
      // compressed).
      let chunks = expo.chunkPushNotifications(messages);
      let tickets = [];
      (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
          try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
            // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
          } catch (error) {
            console.error(error);
          }
        }
      })();
    }

    res.status(201).send(updatedMessages);
  } catch (err) {
    next(err);
  }
});
