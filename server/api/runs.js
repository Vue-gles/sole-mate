const router = require('express').Router();
const { Run, User } = require('../db');
const sequelize = require('sequelize');
const { calculateDistance } = require('../../utils');

const { isAdmin, isUser } = require('../../utils');
module.exports = router;

// GET /api/runs
// Sample url: /api/runs?type=potential&distance=3000&lat=40.71624740000001&long=-73.998268
router.get('/', async (req, res, next) => {
  try {
    console.log('REQ.QUERY', req.query);
    const { type } = req.query;
    let runs;
    if (type === 'potential') {
      // const maxDistance = req.query.distance ? req.query.distance : undefined
      runs = await Run.getPotentialRuns(req.user.id, +req.query.maxDistance, +req.query.lat, +req.query.long)
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

router.get('/location', async (req, res, next) => {
  try {
    const Op = sequelize.Op;

    var lat = req.body.lat;
    var long = req.body.long;

    const allRuns = await Run.findAll();
    const runsWithinDistance = allRuns.filter(run => {
      const distance = calculateDistance(lat, long, run.lat, run.long);
      console.log(
        'The distance is ------->',
        lat,
        long,
        run.lat,
        run.long,
        distance
      );
      if (distance < 0.5) {
        return run;
      }
    });
    res.send(runsWithinDistance);
  } catch (error) {
    next(error);
  }

  // console.log('LOG IS: ', req.body)
  // var attributes = Object.keys(Run.tableAttributes);
  // console.log('attributes are: ', attributes)
  // var location = sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`);
  // console.log('LOCATION IS>>>>', location)
  // var distance = sequelize.fn('ST_Distance', sequelize.literal('location'), location);
  // console.log("DISTANCE IS: ", distance)
  // attributes.push([distance,'distance']);

  // Run.findAll({
  //   attributes: attributes,
  //   where: sequelize.where(distance, {[Op.lte]: 100}),
  //   logging: console.log
  // })
  // .then(function(instance){
  //   return res.send(instance);
  // })
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
// PUT /api/runs/route
router.put('/route', isUser, async (req, res, next) => {
  try {
    const run = await Run.findOne({
      where: {
        creatorId: req.user.id,
      },
    });
    const { route } = req.body;
    const updated = await run.update({
      route: route,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});
// PUT /api/runs/distance
router.put('/distance', isUser, async (req, res, next) => {
  try {
    const run = await Run.findOne({
      where: {
        creatorId: req.user.id,
      },
    });
    const { distance } = req.body;
    const updated = await run.update({
      distance: distance,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});
