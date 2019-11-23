const isUser = (req, res, next) => {
  try {
    if (req.user) next();
    else res.status(403).send('Must login to access');
  } catch (err) {
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) next();
      else res.status(403).send('Must be an admin to access');
    } else res.status(403).send('Must login to access');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  isUser,
  isAdmin,
};
