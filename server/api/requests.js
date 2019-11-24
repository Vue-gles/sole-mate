const router = require('express').Router();
const { Request, Run, User } = require('../db');
const { isAdmin, isUser } = require('../../utils');

// router.get('/', isUser, async (req, res, next) => {
//   try {
//     const allRequests = await Request.findAll();
//     res.send(allRequests);
//   } catch (error) {
//     next(error);
//   }
// });

// Outgoing Requests
// GET /api/requests
router.get('/outgoing', isUser, async (req, res, next) => {
  try {
    const outgoing = await Request.findAll({
      where: {
        requesterId: req.user.id,
      },
      include: [{ model: Run, include: [{ model: User, as: 'Creator' }] }],
    });
    if (outgoing) {
      res.send(outgoing);
    } else {
      res.send('No outgoing requests.');
    }
  } catch (error) {
    next(error);
  }
});

// Incoming Requests
// GET /api/requests/incoming

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

router.post('/', isUser, async (req, res, next) => {
  try {
    const newRequest = await Request.create({
      requesterId: req.body.requesterId,
      runId: req.body.runId,
      status: 'pending',
    });
    res.send(newRequest);
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
