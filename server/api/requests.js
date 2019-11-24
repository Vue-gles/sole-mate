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
router.put('/', isUser, async (req, res, next) => {
  try {
    const { runId, requesterId, status } = req.body;
    const newlyApprovedRequest = await Request.updateRequestStatus(
      runId,
      requesterId,
      status
    );
    res.send(newlyApprovedRequest);
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
router.get('/:requesterId/:runId/', isUser, async (req, res, next) => {
  try {
    const oneRequest = await Request.findOne({
      where: {
        requesterId: req.params.requesterId,
        runId: req.params.runId,
      },
    });
    res.send(oneRequest);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
