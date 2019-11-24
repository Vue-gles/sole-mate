const router = require('express').Router();
const { Run, User } = require('../db');
const { isAdmin, isUser } = require('../../utils');
module.exports = router;

// GET /api/runs
router.get('/', isUser, async (req, res, next) => {
  try {
    const runs = await Run.findAll({
      include: [{ model: User, as: 'Creator' }],
    });
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
    const run = await Run.findByPk(req.params.runId);
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
    const { locationName, startTimeframe, endTimeframe } = req.body;
    const newRun = await Run.create({
      locationName,
      startTimeframe,
      endTimeframe,
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
