const router = require('express').Router();
const { Request, Run, User, Message } = require('../db');
const { isAdmin, isUser } = require('../../utils');
const Op = require('sequelize').Op;
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
    res.status(201).send(updatedMessages);
  } catch (err) {
    next(err);
  }
});
