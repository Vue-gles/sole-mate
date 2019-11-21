'use strict';

const { db, User, Run } = require('../server/db');

const users = [
  {
    firstName: 'Janice',
    lastName: 'Hawthorne',
    email: 'jhawth@gmail.com',
    password: '1234',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDSCyuGMXp-0GmBh_W_ij8vYWAa_Z8WZf9K0oS5EbXE6MurCxPQ&s',
    defaultAddress: '792 Sterling Street',
    avePace: 6,
    avgMileage: 8,
    goal: 'fitness',
    bio: 'Hey guys I love running so much run with me please.',
  },
  {
    firstName: 'Bilbo',
    lastName: 'Baggins',
    email: 'bebobags@aol.com',
    password: '1234',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDSCyuGMXp-0GmBh_W_ij8vYWAa_Z8WZf9K0oS5EbXE6MurCxPQ&s',
    defaultAddress: '35 Irving Street',
    avePace: 6,
    avgMileage: 8,
    goal: 'weightloss',
    bio: 'Running is awesome yo',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@email.com',
    password: '1234',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDSCyuGMXp-0GmBh_W_ij8vYWAa_Z8WZf9K0oS5EbXE6MurCxPQ&s',
    defaultAddress: '4 Broadway Ave.',
    avePace: 7,
    avgMileage: 3,
    goal: 'hobby',
    bio: 'RUN! RUN! RUN!',
  },
  {
    firstName: 'Lauren',
    lastName: 'Smithereen',
    email: 'lauren@email.com',
    password: '1234',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDSCyuGMXp-0GmBh_W_ij8vYWAa_Z8WZf9K0oS5EbXE6MurCxPQ&s',
    defaultAddress: '20 2nd Avenue',
    avePace: 10,
    avgMileage: 2,
    goal: 'hobby',
    bio: 'I loveeee running',
  },
  {
    firstName: 'Jacob',
    lastName: 'James',
    email: 'jacob@email.com',
    password: '1234',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDSCyuGMXp-0GmBh_W_ij8vYWAa_Z8WZf9K0oS5EbXE6MurCxPQ&s',
    defaultAddress: '20 41st Street',
    avePace: 7,
    avgMileage: 7,
    goal: 'fitness',
    bio: 'I loveeee running',
  },
  {
    firstName: 'Daniel',
    lastName: 'Howard',
    email: 'dan@yahoo.com',
    password: '1234',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDSCyuGMXp-0GmBh_W_ij8vYWAa_Z8WZf9K0oS5EbXE6MurCxPQ&s',
    defaultAddress: '20 1st Street',
    avePace: 5,
    avgMileage: 20,
    goal: 'fitness',
    bio: 'I loveeee running',
  },
  {
    firstName: 'Richard',
    lastName: 'Stevens',
    email: 'richieS@aol.com',
    password: '1234',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDSCyuGMXp-0GmBh_W_ij8vYWAa_Z8WZf9K0oS5EbXE6MurCxPQ&s',
    defaultAddress: '20 49th Street',
    avePace: 9,
    avgMileage: 10,
    goal: 'fitness',
    bio: 'I loveeee running',
  },
];

const runs = [
  {
    locationName: '123 Main St',
    startTimeframe: new Date('2019-12-22 08:00:00'),
    endTimeframe: new Date('2019-12-22 12:00:00'),
    creatorId: 1,
  },
  {
    locationName: '456 Fall Rd',
    startTimeframe: new Date('2019-12-10 12:00:00'),
    endTimeframe: new Date('2019-12-10 16:00:00'),
    creatorId: 1,
  },
  {
    locationName: '88 Hopewell Ave',
    startTimeframe: new Date('2019-12-08 16:00:00'),
    endTimeframe: new Date('2019-12-08 20:00:00'),
    creatorId: 2,
  },
  {
    locationName: '1 Benford Dr',
    startTimeframe: new Date('2019-12-06 20:00:00'),
    endTimeframe: new Date('2019-12-06 24:00:00'),
    creatorId: 3,
  },
  {
    locationName: '15 Hanover Ct',
    startTimeframe: new Date('2019-12-08 08:00:00'),
    endTimeframe: new Date('2019-12-08 12:00:00'),
    creatorId: 4,
  },
  {
    locationName: '101 Lily Ln',
    startTimeframe: new Date('2019-12-04 08:00:00'),
    endTimeframe: new Date('2019-12-04 12:00:00'),
    creatorId: 5,
  },
  {
    locationName: '33 Wythe Ave',
    startTimeframe: new Date('2019-12-22 12:00:00'),
    endTimeframe: new Date('2019-12-22 16:00:00'),
    creatorId: 5,
  },
  {
    locationName: '77 Lucky St',
    startTimeframe: new Date('2019-12-22 20:00:00'),
    endTimeframe: new Date('2019-12-22 24:00:00'),
    creatorId: 1,
  },
];

const requests = [
  {
    status: 'pending',
    runId: 1,
    requesterId: 4,
  },
  {
    status: 'pending',
    runId: 2,
    requesterId: 3,
  },
  {
    status: 'pending',
    runId: 4,
    requesterId: 1,
  },
  {
    status: 'pending',
    runId: 2,
    requesterId: 4,
  },
];

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  await User.bulkCreate(users);
  await Run.bulkCreate(runs);

  // iterate over requests array to make requests on run ads
  for (let i = 0; i < requests.length; i++) {
    const user = await User.findByPk(requests[i].requesterId);
    await user.addRequest(requests[i].runId);
  }

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
