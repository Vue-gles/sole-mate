const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/runs', require('./runs'));
router.use('/requests', require('./requests'));
router.use('/messages',require('./messages'))

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
