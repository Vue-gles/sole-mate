const router = require('express').Router();
const { Run } = require('../db');
module.exports = router;

// GET /api/runs
router.get('/', async (req, res, next) => {
  try {
    const runs = await Run.findAll();
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
router.get('/:runId', async (req, res, next) => {
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
