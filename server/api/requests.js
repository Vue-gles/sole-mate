const router = require('express').Router();
const { Request, Run, User } = require('../db');
const { isAdmin, isUser } = require('../../utils');
const { Expo } = require('expo-server-sdk');
// Create a new Expo SDK client
let expo = new Expo();

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

    await Request.updateRequestStatus(req.user.id, runId, requesterId, status);
    const incoming = await Request.getIncoming(req.user.id);

    const run = await Run.findByPk(runId);
    const creator = await User.findByPk(req.user.id);
    const requester = await User.findByPk(requesterId);
    if (requester.token) {
      const requests = [];
      requests.push({
        to: requester.token,
        sound: 'default',
        title: `Run request ${status}`,
        body: `${creator.firstName} ${creator.lastName} ${status} your run request`,
        data: {
          title: `Run request ${status}`,
          body: `${creator.firstName} ${creator.lastName} ${status} your run request`,
        },
        _displayInForeground: true,
      });

      // The Expo push notification service accepts batches of notifications so
      // that you don't need to send 1000 requests to send 1000 notifications. We
      // recommend you batch your notifications to reduce the number of requests
      // and to compress them (notifications with similar content will get
      // compressed).
      let chunks = expo.chunkPushNotifications(requests);
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

    const run = await Run.findByPk(req.params.runId);
    const creator = await User.findByPk(run.creatorId);
    const requestor = await User.findByPk(req.user.id);

    if (creator.token) {
      const requests = [];
      requests.push({
        to: creator.token,
        sound: 'default',
        title: `New run request`,
        body: `New run request from ${requestor.firstName} ${requestor.lastName}`,
        data: {
          title: `New run request`,
          body: `New run request from ${requestor.firstName} ${requestor.lastName}`,
        },
        _displayInForeground: true,
      });

      // The Expo push notification service accepts batches of notifications so
      // that you don't need to send 1000 requests to send 1000 notifications. We
      // recommend you batch your notifications to reduce the number of requests
      // and to compress them (notifications with similar content will get
      // compressed).
      let chunks = expo.chunkPushNotifications(requests);
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
