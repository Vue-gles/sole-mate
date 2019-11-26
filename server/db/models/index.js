const User = require('./user');
const Run = require('./run');
const Request = require('./request');
const Message=require('./message')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 //User has many Runs association
User.hasMany(Run, { as: 'Creator', foreignKey: 'creatorId' });
Run.belongsTo(User, { as: 'Creator', foreignKey: 'creatorId' });

//Requests join table association
User.belongsToMany(Run, {
  through: Request,
  as: 'Request',
  foreignKey: 'requesterId',
});
Run.belongsToMany(User, { through: Request, as: 'Run' });
Request.belongsTo(Run);
Request.belongsTo(User, { as: 'Request', foreignKey: 'requesterId' });


//Message Join Table
User.belongsToMany(User,{
  through: Message,
  as: 'Receiver',
  foreignKey: 'receiverId'
})
User.belongsToMany(User,{
  through: Message,
  as: 'Sender',
  foreignKey:'senderId'
})
// Message.belongsTo(User);
// Message.belongsTo(User, { as: 'Receiver', foreignKey: 'creatorId' });


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
  Message
};
