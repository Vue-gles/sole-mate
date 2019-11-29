const User = require('./user');
const Run = require('./run');
const Request = require('./request');
const Message = require('./message');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//User has many Runs association
/*
User.hasMany(Run, { as: 'Creator', foreignKey: 'creatorId' });
Run.belongsTo(User, { as: 'Creator', foreignKey: 'creatorId' });

//Requests Join Table
User.belongsToMany(Run, {
  through: Request,
  as: 'Request',
  foreignKey: 'requesterId',
});
Run.belongsToMany(User, { through: Request, as: 'Run' });
Request.belongsTo(Run);
Request.belongsTo(User, { as: 'Request', foreignKey: 'requesterId' });
*/

// User and Runs associations
User.hasMany(Run, { as: 'Creator', foreignKey: 'creatorId' });
User.hasMany(Run, { as: 'Partner', foreignKey: 'partnerId' });
Run.belongsTo(User, { as: 'Creator', foreignKey: 'creatorId' });
Run.belongsTo(User, { as: 'Partner', foreignKey: 'partnerId' });

// User and Requests associations
User.hasMany(Request, { as: 'Requester', foreignKey: 'requesterId' });
Request.belongsTo(User, { as: 'Requester', foreignKey: 'requesterId' });

// Run and Requests associations
Run.hasMany(Request);
Request.belongsTo(Run);

// User and Message associations
User.hasMany(Message, {
  as: 'Receiver',
  foreignKey: 'receiverId',
});
User.hasMany(Message, { as: 'Sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });
Message.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Run,
  Request,
  Message,
};
