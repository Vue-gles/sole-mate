const router = require('express').Router();
const { Run, User } = require('../db');
const sequelize = require('sequelize');
const { calculateDistance } = require('../../utils');

const { isAdmin, isUser } = require('../../utils');
module.exports = router;

// GET /api/runs -- Sample url: /api/runs?type=potential&distance=3000&lat=40.71624740000001&long=-73.998268
router.get('/', isUser, async (req, res, next) => {
  try {
    console.log('REQ.QUERY', req.query);
    const { type } = req.query;
    let runs;
    if (type === 'potential') {
      const maxDistance = req.query.distance ? req.query.distance : undefined;
      runs = await Run.getPotentialRuns(
        req.user.id,
        maxDistance,
        req.query.lat,
        req.query.long
      );
    }
    if (type === 'upcoming') runs = await Run.getUpcomingRuns(req.user.id);
    if (type === 'past') runs = await Run.getPastRuns(req.user.id);
    if (runs) {
      res.send(runs);
    } else {
      res.status(404).send(`Couldn't find any runs`);
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/runs/:runId
router.get('/:runId', isUser, async (req, res, next) => {
  try {
    const run = await Run.findByPk(req.params.runId, {
      include: [{ model: User, as: 'Creator' }],
    });
    if (run) {
      res.send(run);
    } else {
      res.status(404).send(`Couldn't find run with id: ${req.params.runId}`);
    }
  } catch (err) {
    next(err);
  }
});

// POST /api/runs
router.post('/', isUser, async (req, res, next) => {
  try {
    const {
      street,
      city,
      state,
      lat,
      long,
      prefferedMileage,
      locationName,
      startTimeframe,
      endTimeframe,
    } = req.body;
    const newRun = await Run.create({
      street,
      city,
      state,
      lat,
      long,
      startTimeframe,
      endTimeframe,
      prefferedMileage,
      creatorId: req.user.id,
    });
    if (newRun) {
      res.send(newRun);
    } else {
      res.status(400).send(`Unable to create run`);
    }
  } catch (err) {
    next(err);
  }
});

//PUT /api/runs/:runId
router.put('/:runId', isUser, async (req, res, next) => {
  try {
    const run = await Run.findByPk(req.params.runId);
    const { route, distance } = req.body;
    const updated = await run.update({
      route,
      distance,
      isComplete: true,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});
