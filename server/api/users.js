const router = require('express').Router();
const { User } = require('../db');
const { isAdmin, isUser } = require('../../utils');
module.exports = router;

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId
// Used to get some info about running partners
router.get('/:userId', isUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'imageUrl',
        'avgPace',
        'avgMileage',
        'goal',
        'bio',
      ],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      defaultAddress,
      imageUrl,
      avgPace,
      avgMileage,
      goal,
      bio,
    } = req.body;
    const newuser = await User.create({
      email,
      password,
      firstName,
      lastName,
      defaultAddress,
      imageUrl,
      avgPace,
      avgMileage,
      goal,
      bio,
    });
    if (!newuser) {
      res.status(401).send('Wrong infromation. Try again or gtfo');
    }
    res.status(201);
    res.send(newuser);
  } catch (err) {
    next(err);
  }
});

router.put('/current', isUser, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    const { currentLong, currentLat } = req.body;
    const updated = await user.update({
      currentLong: currentLong,
      currentLat: currentLat,
    });
    // console.log('req.body',req.body)
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.put('/', isUser, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    const { route } = req.body;
    const updated = await user.update({
      route: route,
    });
    console.log('ROUTES API', req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});
