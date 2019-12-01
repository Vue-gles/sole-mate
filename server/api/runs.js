const router = require('express').Router();
const { Run, User } = require('../db');
const sequelize = require('sequelize');

const { isAdmin, isUser } = require('../../utils');
module.exports = router;

// GET /api/runs
router.get('/', isUser, async (req, res, next) => {
  try {
    console.log('REQ.QUERY', req.query)
    const { type, distance } = req.query;
    let runs;
    if (type === 'potential') runs = await Run.getPotentialRuns(req.user.id);
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

router.get('/location', (req, res, next) => {
  const Op = sequelize.Op

var lat = req.body.lat
var lng = req.body.long
console.log('LOG IS: ', req.body)
var attributes = Object.keys(Run.tableAttributes);
console.log('attributes are: ', attributes)
var location = sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`);
console.log('LOCATION IS>>>>', location)
var distance = sequelize.fn('ST_Distance', sequelize.literal('location'), location);
console.log("DISTANCE IS: ", distance)
attributes.push([distance,'distance']);

Run.findAll({
  attributes: attributes,
  where: sequelize.where(distance, {[Op.lte]: 10}),
  logging: console.log
})
.then(function(instance){
  return res.send(instance);
})
})

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
    const { street, city, state, lat, long, prefferedMileage, locationName, startTimeframe, endTimeframe } = req.body;
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
router.put('/route', isUser, async (req,res,next) => {
  try {
    const run = await Run.findOne({
      where:{
       creatorId:req.user.id 
      }
    })
    const {route} = req.body
    const updated = await run.update({
      route: route,
    })
    res.json(updated)
  } catch(err) {
    next(err)
  }
})
// PUT /api/runs/distance
router.put('/distance', isUser, async (req,res,next) => {
  try {
    const run = await Run.findOne({
      where:{
       creatorId:req.user.id 
      }
    })
    const {distance} = req.body
    const updated=await run.update({
      distance: distance
    })
    res.json(updated)
  } catch(err) {
    next(err)
  }
})
