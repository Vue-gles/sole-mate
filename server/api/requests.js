const router = require('express').Router();
const { Request, Run, User } = require('../db');
const { isAdmin, isUser } = require('../../utils');

// Outgoing Requests
// GET /api/requests/outgoing
router.get('/outgoing', isUser, async (req, res, next) => {
  try {
    const outgoing = await Request.getOutgoing(req.user.id);
    if (outgoing) {
      res.send(outgoing);
    } else {
      res.status(404).send('No outgoing requests.');
    }
  } catch (error) {
    next(error);
  }
});

// Incoming Requests
// GET /api/requests/incoming
router.get('/incoming', isUser, async (req, res, next) => {
  try {
    const incoming = await Request.getIncoming(req.user.id);
    if (incoming) {
      res.send(incoming);
    } else {
      res.status(404).send('No incoming requests');
    }
  } catch (error) {
    next(error);
  }
});

// Request.updateRequestStatus is a class method found in db/models/request
// PUT /api/requests
router.put('/', isUser, async (req, res, next) => {
  try {
    const { runId, requesterId, status } = req.body;
    console.log('runId:', runId, 'requesterId', requesterId, 'status', status);
    await Request.updateRequestStatus(req.user.id, runId, requesterId, status);
    const incoming = await Request.getIncoming(req.user.id);
    res.send(incoming);
  } catch (error) {
    next(error);
  }
});

// Create new request
// POST /api/requests/:runId
router.post('/:runId', isUser, async (req, res, next) => {
  try {
    await Request.addNew(req.user.id, req.params.runId);
    const outgoing = await Request.getOutgoing(req.user.id);
    res.send(outgoing);
  } catch (error) {
    next(error);
  }
});

// GET one request by requesterId and runId
// GET /api/requests/:runId
router.get('/:runId', isUser, async (req, res, next) => {
  try {
    const oneRequest = await Request.findOne({
      where: {
        requesterId: req.user.id,
        runId: req.params.runId,
      },
      include: [{ model: Run, include: [{ model: User, as: 'Creator' }] }],
    });
    res.send(oneRequest);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
