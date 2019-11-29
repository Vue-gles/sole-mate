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
