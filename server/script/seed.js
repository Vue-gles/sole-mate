// 'use strict';
// require('../keys');
const { db, User, Run, Message, Request } = require('../db');
const axios = require('axios');

const users = [
  {
    firstName: 'Janice',
    lastName: 'Hawthorne',
    email: 'jhawth@gmail.com',
    password: '1234',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lrg-dsc01551-jpg-1572380102.jpg?crop=0.668xw:1.00xh;0.316xw,0&resize=360:*',
    defaultAddress: '792 Sterling Street',
    avePace: 6,
    avgMileage: 8,
    goal: 'fitness',
    bio: 'Hey guys I love running so much run with me please.',
  },
  {
    firstName: 'Allison',
    lastName: 'Reed',
    email: 'allison@aol.com',
    password: '1234',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/img-4551-jpg-1566239018.jpg?crop=1.00xw:0.670xh;0,0.293xh&resize=360:*',
    defaultAddress: '35 Irving Street',
    avePace: 6,
    avgMileage: 8,
    goal: 'weightloss',
    bio: 'Running is awesome yo',
  },
  {
    firstName: 'John',
    lastName: 'Ward',
    email: 'john@email.com',
    password: '1234',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/img-2327-1559154410.jpg?crop=1.00xw:0.810xh;0,0.00775xh&resize=360:*',
    defaultAddress: '4 Broadway Ave.',
    avePace: 7,
    avgMileage: 3,
    goal: 'hobby',
    bio: `Hi! I'm John and I love long distance running. Hit me up if you want to run in the park sometime!`,
    isAdmin: true,
  },
  {
    firstName: 'Lauren',
    lastName: 'Paulson',
    email: 'lauren@email.com',
    password: '1234',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/unknown-5-1557341297.jpeg?crop=0.670xw:1.00xh;0.269xw,0&resize=360:*',
    defaultAddress: '20 2nd Avenue',
    avePace: 10,
    avgMileage: 2,
    goal: 'hobby',
    bio: 'I loveeee running',
  },
  {
    firstName: 'Jane',
    lastName: 'Turner',
    email: 'jane@email.com',
    password: '1234',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/unknown-1573850426.jpeg?crop=0.782xw:1.00xh;0.111xw,0&resize=360:*',
    defaultAddress: '20 41st Street',
    avePace: 7,
    avgMileage: 7,
    goal: 'fitness',
    bio:
      'Hi! My name is Jane. I’m 28 and live in Brooklyn with my friends. I love living in New York and taking advantage of all the running opportunities here. I’m currently just running because I like the fitness routine and love the rush of endorphins afterward, but one day I’d love to run a marathon or train for a triathlon. I love meeting running friends and can’t wait to meet you too!',
  },
  {
    firstName: 'Daniel',
    lastName: 'Howard',
    email: 'dan@yahoo.com',
    password: '1234',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/boa-boa-patitucci-trail-dan6524-rgb-1280x850-half-vincentviet-1-1573670157.jpg?crop=0.663xw:1.00xh;0.179xw,0&resize=360:*',
    defaultAddress: '20 1st Street',
    avePace: 5,
    avgMileage: 20,
    goal: 'fitness',
    bio: 'I loveeee running',
  },
  {
    firstName: 'Riley',
    lastName: 'Stevens',
    email: 'rileys@aol.com',
    password: '1234',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/screen-shot-2019-03-12-at-5-29-18-pm-1552426177.png?crop=1.00xw:0.671xh;0,0.0565xh&resize=360:*',
    defaultAddress: '20 49th Street',
    avePace: 9,
    avgMileage: 10,
    goal: 'fitness',
    bio: 'I loveeee running',
  },
];

const runs = [
  {
    street: '33 Wythe Ave',
    city: 'New York',
    state: 'NY',
    lat: 40.7411,
    long: -73.9897,
    startTimeframe: new Date('2019-12-04 12:00:00'),
    endTimeframe: new Date('2019-12-22 23:00:00'),
    prefferedMileage: 8,
    creatorId: 5,
    partnerId: 3,
    distance: 0.88,
    seconds: 643,
    isComplete: true,
    route: JSON.stringify([
      { longitude: -74.0093707, latitude: 40.7048556 },
      { longitude: -74.0092631, latitude: 40.7049034 },
      { longitude: -74.0092148, latitude: 40.7048912 },
      { longitude: -74.0091397, latitude: 40.7048912 },
      { longitude: -74.0090807, latitude: 40.7049034 },
      { longitude: -74.0090538, latitude: 40.7049359 },
      { longitude: -74.0089975, latitude: 40.7049237 },
      { longitude: -74.0089385, latitude: 40.7049278 },
      { longitude: -74.0089117, latitude: 40.7049522 },
      { longitude: -74.0088902, latitude: 40.7049867 },
      { longitude: -74.0089224, latitude: 40.7050091 },
      { longitude: -74.0089519, latitude: 40.7050376 },
      { longitude: -74.008968, latitude: 40.7050721 },
      { longitude: -74.0089412, latitude: 40.7051047 },
      { longitude: -74.008968, latitude: 40.7051331 },
      { longitude: -74.0090056, latitude: 40.7051494 },
      { longitude: -74.0090217, latitude: 40.7051982 },
      { longitude: -74.0090163, latitude: 40.7052267 },
      { longitude: -74.0090029, latitude: 40.7052551 },
      { longitude: -74.0090324, latitude: 40.7052795 },
      { longitude: -74.0089734, latitude: 40.7053222 },
      { longitude: -74.0089439, latitude: 40.7053426 },
      { longitude: -74.00896, latitude: 40.705367 },
      { longitude: -74.0090002, latitude: 40.7053995 },
      { longitude: -74.0090324, latitude: 40.7054259 },
      { longitude: -74.0090378, latitude: 40.7054951 },
      { longitude: -74.0090619, latitude: 40.7055235 },
      { longitude: -74.0090217, latitude: 40.7055906 },
      { longitude: -74.0090324, latitude: 40.7056252 },
      { longitude: -74.0090324, latitude: 40.7056516 },
      { longitude: -74.0090351, latitude: 40.7056781 },
      { longitude: -74.0090243, latitude: 40.7057126 },
      { longitude: -74.0090002, latitude: 40.705735 },
      { longitude: -74.0089734, latitude: 40.7057614 },
      { longitude: -74.0089358, latitude: 40.7057838 },
      { longitude: -74.0089144, latitude: 40.7058082 },
      { longitude: -74.0089144, latitude: 40.7058306 },
      { longitude: -74.0089144, latitude: 40.7058814 },
      { longitude: -74.0089117, latitude: 40.7059099 },
      { longitude: -74.0088768, latitude: 40.7059302 },
      { longitude: -74.0088446, latitude: 40.7059566 },
      { longitude: -74.0088285, latitude: 40.705983 },
      { longitude: -74.0088312, latitude: 40.7060156 },
      { longitude: -74.0088253, latitude: 40.7060453 },
      { longitude: -74.0088789, latitude: 40.7060514 },
      { longitude: -74.0089487, latitude: 40.7060798 },
      { longitude: -74.0089844, latitude: 40.706116 },
      { longitude: -74.0090152, latitude: 40.7061211 },
      { longitude: -74.0090259, latitude: 40.7061434 },
      { longitude: -74.0090487, latitude: 40.7061475 },
      { longitude: -74.0090675, latitude: 40.7061628 },
      { longitude: -74.009097, latitude: 40.7061719 },
      { longitude: -74.0091316, latitude: 40.7061964 },
      { longitude: -74.0091584, latitude: 40.7061974 },
      { longitude: -74.0091732, latitude: 40.7062147 },
      { longitude: -74.0091906, latitude: 40.706233 },
      { longitude: -74.0092201, latitude: 40.706233 },
      { longitude: -74.0092523, latitude: 40.7062574 },
      { longitude: -74.0092952, latitude: 40.7062615 },
      { longitude: -74.009306, latitude: 40.706292 },
      { longitude: -74.0093408, latitude: 40.706296 },
      { longitude: -74.0093848, latitude: 40.7063164 },
      { longitude: -74.0094143, latitude: 40.7063347 },
      { longitude: -74.0094117, latitude: 40.706352 },
      { longitude: -74.0094586, latitude: 40.706352 },
      { longitude: -74.0094881, latitude: 40.706353 },
      { longitude: -74.009531, latitude: 40.706355 },
      { longitude: -74.0095907, latitude: 40.706439 },
      { longitude: -74.0096229, latitude: 40.7064614 },
      { longitude: -74.0096953, latitude: 40.7064756 },
      { longitude: -74.0097704, latitude: 40.7065631 },
      { longitude: -74.009824, latitude: 40.706618 },
      { longitude: -74.0098643, latitude: 40.7066261 },
      { longitude: -74.0098938, latitude: 40.7066525 },
      { longitude: -74.0099421, latitude: 40.7066566 },
      { longitude: -74.0099564, latitude: 40.7066988 },
      { longitude: -74.0100101, latitude: 40.7067516 },
      { longitude: -74.0101227, latitude: 40.7068126 },
      { longitude: -74.0101978, latitude: 40.7068289 },
      { longitude: -74.0103051, latitude: 40.7069184 },
      { longitude: -74.0103534, latitude: 40.706955 },
      { longitude: -74.0103971, latitude: 40.7070282 },
      { longitude: -74.0104722, latitude: 40.7070444 },
      { longitude: -74.0105258, latitude: 40.7070688 },
      { longitude: -74.0105848, latitude: 40.707138 },
      { longitude: -74.0106975, latitude: 40.7072356 },
      { longitude: -74.0108584, latitude: 40.7072762 },
      { longitude: -74.010955, latitude: 40.7073657 },
      { longitude: -74.0110516, latitude: 40.7074064 },
      { longitude: -74.0111803, latitude: 40.707504 },
      { longitude: -74.0112554, latitude: 40.7076016 },
      { longitude: -74.0113627, latitude: 40.7076422 },
      { longitude: -74.0115236, latitude: 40.7076504 },
      { longitude: -74.0116524, latitude: 40.7077236 },
      { longitude: -74.0118777, latitude: 40.7075284 },
      { longitude: -74.0118669, latitude: 40.7074308 },
      { longitude: -74.0120064, latitude: 40.7073901 },
      { longitude: -74.0121459, latitude: 40.7071868 },
      { longitude: -74.0127252, latitude: 40.7070485 },
      { longitude: -74.0125429, latitude: 40.7069265 },
      { longitude: -74.0124034, latitude: 40.7068777 },
      { longitude: -74.0122854, latitude: 40.7068127 },
      { longitude: -74.0121888, latitude: 40.7066663 },
      { longitude: -74.0119957, latitude: 40.70665 },
      { longitude: -74.0117597, latitude: 40.7065443 },
      { longitude: -74.0115987, latitude: 40.7063897 },
      { longitude: -74.0114485, latitude: 40.7064141 },
      { longitude: -74.0113198, latitude: 40.7063328 },
      { longitude: -74.0112232, latitude: 40.7062515 },
      { longitude: -74.0109121, latitude: 40.7062515 },
      { longitude: -74.0108132, latitude: 40.7061757 },
      { longitude: -74.0107488, latitude: 40.706135 },
      { longitude: -74.0106523, latitude: 40.7061594 },
      { longitude: -74.0105289, latitude: 40.7060455 },
      { longitude: -74.010427, latitude: 40.7060089 },
      { longitude: -74.0103358, latitude: 40.7060211 },
      { longitude: -74.0102714, latitude: 40.7059642 },
      { longitude: -74.0102177, latitude: 40.7059195 },
      { longitude: -74.0101534, latitude: 40.7059154 },
      { longitude: -74.010089, latitude: 40.7059195 },
      { longitude: -74.0099871, latitude: 40.7059154 },
      { longitude: -74.0099227, latitude: 40.7059357 },
      { longitude: -74.0098637, latitude: 40.7059113 },
      { longitude: -74.0099012, latitude: 40.70583 },
      { longitude: -74.0098422, latitude: 40.7058056 },
      { longitude: -74.009786, latitude: 40.7057466 },
      { longitude: -74.0097324, latitude: 40.7057588 },
      { longitude: -74.0096627, latitude: 40.7057588 },
      { longitude: -74.0096197, latitude: 40.7057222 },
      { longitude: -74.0095634, latitude: 40.705714 },
      { longitude: -74.0094937, latitude: 40.7056408 },
      { longitude: -74.0093435, latitude: 40.7056449 },
      { longitude: -74.0092791, latitude: 40.7056856 },
      { longitude: -74.0092201, latitude: 40.705649 },
      { longitude: -74.0094051, latitude: 40.7058236 },
      { longitude: -74.0096626, latitude: 40.705791 },
      { longitude: -74.0098771, latitude: 40.7056202 },
      { longitude: -74.0099415, latitude: 40.7054169 },
      { longitude: -74.0100488, latitude: 40.7053193 },
      { longitude: -74.0100273, latitude: 40.7052298 },
      { longitude: -74.0099522, latitude: 40.7051404 },
      { longitude: -74.0098557, latitude: 40.7050428 },
      { longitude: -74.0097806, latitude: 40.704872 },
      { longitude: -74.0096196, latitude: 40.7047906 },
      { longitude: -74.0095016, latitude: 40.704872 },
      { longitude: -74.009448, latitude: 40.7047662 },
    ]),
  },
  {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    lat: 40.7411,
    long: -73.9897,
    startTimeframe: new Date('2019-12-09 08:00:00'),
    endTimeframe: new Date('2019-12-09 23:00:00'),
    prefferedMileage: 3,
    creatorId: 1,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-06 12:00:00'),
    endTimeframe: new Date('2019-11-06 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 29,
    distance: 3.9,
    partnerId: 1,
    route: JSON.stringify([
      {
        latitude: 40.276141,
        longitude: -74.592255,
      },
      {
        latitude: 40.276386,
        longitude: -74.592501,
      },
      {
        latitude: 40.276976,
        longitude: -74.593167,
      },
      {
        latitude: 40.276444,
        longitude: -74.593918,
      },
      {
        latitude: 40.275625,
        longitude: -74.594883,
      },
      {
        latitude: 40.273684,
        longitude: -74.595895,
      },
      {
        latitude: 40.27177,
        longitude: -74.59691,
      },
      {
        latitude: 40.270652,
        longitude: -74.593449,
      },
      {
        latitude: 40.270652,
        longitude: -74.593449,
      },
      {
        latitude: 40.268052,
        longitude: -74.589062,
      },
      {
        latitude: 40.267023,
        longitude: -74.587219,
      },
    ]),
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-09 12:00:00'),
    endTimeframe: new Date('2019-11-09 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 30,
    distance: 3.8,
    partnerId: 6,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-10 12:00:00'),
    endTimeframe: new Date('2019-11-10 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 40,
    distance: 2.8,
    partnerId: 2,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-10 12:00:00'),
    endTimeframe: new Date('2019-11-10 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 32,
    distance: 2,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-12 12:00:00'),
    endTimeframe: new Date('2019-11-12 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 36,
    distance: 3.3,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-09-12 12:00:00'),
    endTimeframe: new Date('2019-09-12 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 39,
    distance: 3.3,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-13 12:00:00'),
    endTimeframe: new Date('2019-11-13 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 30,
    distance: 3.3,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-17 12:00:00'),
    endTimeframe: new Date('2019-11-17 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 30,
    distance: 3.3,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-18 12:00:00'),
    endTimeframe: new Date('2019-11-18 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 85,
    distance: 6.8,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-20 12:00:00'),
    endTimeframe: new Date('2019-11-20 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 90,
    distance: 8,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-21 12:00:00'),
    endTimeframe: new Date('2019-11-21 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 90,
    distance: 7,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-12-03 12:00:00'),
    endTimeframe: new Date('2019-12-03 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 66,
    distance: 7,
    partnerId: 2,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-27 12:00:00'),
    endTimeframe: new Date('2019-11-27 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 65,
    distance: 5.7,
    partnerId: 1,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-12-01 12:00:00'),
    endTimeframe: new Date('2019-12-01 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 51,
    distance: 6,
    partnerId: 2,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-11-01 12:00:00'),
    endTimeframe: new Date('2019-11-01 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 32,
    distance: 3.6,
    partnerId: 2,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-10-08 12:00:00'),
    endTimeframe: new Date('2019-10-08 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 44,
    distance: 3.8,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-10-12 12:00:00'),
    endTimeframe: new Date('2019-10-12 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 45,
    distance: 4,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-10-12 12:00:00'),
    endTimeframe: new Date('2019-10-12 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 38,
    distance: 4.2,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-10-20 12:00:00'),
    endTimeframe: new Date('2019-10-20 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 27,
    distance: 3.6,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-10-21 12:00:00'),
    endTimeframe: new Date('2019-10-21 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 30,
    distance: 3.5,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-10-24 12:00:00'),
    endTimeframe: new Date('2019-10-24 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
    seconds: 60 * 37,
    distance: 4.2,
  },
  {
    street: '456 Fall Rd',
    city: 'New York',
    state: 'NY',
    lat: 40.7411,
    long: -73.9897,
    startTimeframe: new Date('2019-12-10 12:00:00'),
    endTimeframe: new Date('2019-12-10 23:00:00'),
    prefferedMileage: 5,
    creatorId: 1,
  },
  {
    street: '88 Hopewell Ave',
    city: 'New York',
    state: 'NY',
    lat: 40.7411,
    long: -73.9897,
    startTimeframe: new Date('2019-12-04 12:00:00'),
    endTimeframe: new Date('2019-12-04 23:00:00'),
    prefferedMileage: 2,
    creatorId: 2,
  },
  {
    street: '1 Benford Dr',
    city: 'New York',
    state: 'NY',
    lat: 40.7411,
    long: -73.9897,
    startTimeframe: new Date('2019-12-04 12:00:00'),
    endTimeframe: new Date('2019-12-04 23:00:00'),
    prefferedMileage: 6,
    creatorId: 3,
  },
  {
    street: '1 Broad Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-12-04 12:00:00'),
    endTimeframe: new Date('2019-12-04 23:00:00'),
    prefferedMileage: 6,
    creatorId: 2,
  },
  {
    street: '1 Main Street',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    long: 87.6298,
    startTimeframe: new Date('2019-12-04 12:00:00'),
    endTimeframe: new Date('2019-12-04 23:00:00'),
    prefferedMileage: 6,
    creatorId: 4,
  },
  {
    street: '15 Hanover Ct',
    city: 'New York',
    state: 'NY',
    lat: 40.7411,
    long: -73.9897,
    startTimeframe: new Date('2019-12-04 12:00:00'),
    endTimeframe: new Date('2019-12-04 23:00:00'),
    prefferedMileage: 6,
    creatorId: 4,
  },
  {
    street: '101 Lily Ln',
    city: 'New York',
    state: 'NY',
    lat: 40.7411,
    long: -73.9897,
    startTimeframe: new Date('2019-12-04 12:00:00'),
    endTimeframe: new Date('2019-12-04 23:00:00'),
    prefferedMileage: 5,
    creatorId: 5,
  },
  {
    street: '77 Lucky St',
    city: 'New York',
    state: 'NY',
    lat: 40.7411,
    long: -73.9897,
    startTimeframe: new Date('2019-12-04 12:00:00'),
    endTimeframe: new Date('2019-12-04 23:00:00'),
    prefferedMileage: 6,
    creatorId: 1,
  },
  {
    street: '666 Sockets St',
    city: 'New York',
    state: 'NY',
    lat: 40.7411,
    long: -73.9897,
    startTimeframe: new Date('2019-12-04 12:00:00'),
    endTimeframe: new Date('2019-12-04 23:00:00'),
    prefferedMileage: 7,
    creatorId: 6,
    partnerId: 3,
    isComplete: true,
    route: JSON.stringify([
      {
        latitude: 40.276141,
        longitude: -74.592255,
      },
      {
        latitude: 40.276386,
        longitude: -74.592501,
      },
      {
        latitude: 40.276976,
        longitude: -74.593167,
      },
      {
        latitude: 40.276444,
        longitude: -74.593918,
      },
      {
        latitude: 40.275625,
        longitude: -74.594883,
      },
      {
        latitude: 40.273684,
        longitude: -74.595895,
      },
      {
        latitude: 40.27177,
        longitude: -74.59691,
      },
      {
        latitude: 40.270652,
        longitude: -74.593449,
      },
      {
        latitude: 40.270652,
        longitude: -74.593449,
      },
      {
        latitude: 40.268052,
        longitude: -74.589062,
      },
      {
        latitude: 40.267023,
        longitude: -74.587219,
      },
    ]),
    distance: 0.01,
  },
];

const requests = [
  {
    runId: 1,
    requesterId: 4,
  },
  {
    runId: 2,
    requesterId: 2,
  },
  {
    runId: 1,
    requesterId: 3,
  },
  {
    runId: 4,
    requesterId: 2,
  },
  {
    runId: 4,
    requesterId: 6,
  },
  {
    runId: 2,
    requesterId: 5,
  },
  {
    runId: 2,
    requesterId: 4,
  },
];
const messages = [
  {
    content: 'how was your day?',
    receiverId: 1,
    senderId: 3,
  },
  {
    content: 'do you want to run?',
    receiverId: 3,
    senderId: 1,
  },
  {
    content: 'lets run in central park',
    receiverId: 1,
    senderId: 3,
  },
  {
    content: 'Can we reschedule our run?',
    receiverId: 4,
    senderId: 2,
  },
  {
    content: `I'm on my way!`,
    receiverId: 3,
    senderId: 6,
  },
  {
    content: 'See you soon!',
    receiverId: 6,
    senderId: 3,
  },
  {
    content: 'Hey! Meet at 2?',
    receiverId: 3,
    senderId: 2,
  },
];

async function updateRuns() {
  try {
    const allRuns = await Run.findAll();
    await allRuns.forEach(async run => {
      if (!run.lat || !run.long) {
        const fullAddress = `${run.street}, ${run.city}, ${run.state}`;
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${process.env.GOOGLE_API_KEY}`
        );

        console.log(data.results[0].geometry.location);
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        // run.lat = lat;
        // run.long = long;
        // const location = {
        //   type: 'Point',
        //   coordinates: [long, lat],
        //   crs: { type: 'name', properties: { name: 'EPSG:4326'} }
        // }
        //got to point where I think my route is working but I am unable to load any data into the location column. Everytime I do, I get this error
        // that says I need to get ST_GeomFromGeoJSON but I don't know how
        await run.update({ lat, long });
      }
    });
  } catch (error) {
    console.error('UPDATING ERROR WAS:>> ', error);
  }
}

async function seed() {
  try {
    await db.sync({ force: true });
    console.log('db synced!');
    await User.bulkCreate(users, { ignoreDuplicates: true });
    await Run.bulkCreate(runs, { ignoreDuplicates: true });
    await Request.bulkCreate(requests);
    await Message.bulkCreate(messages);
  } catch (error) {
    console.log('error:', error);
  }
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed({ force: true });
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// <<<<<<< form-cleanup
// =======
//         // console.log(data.results[0].geometry.location);
//         const lat = data.results[0].geometry.location.lat;
//         const long = data.results[0].geometry.location.lng;
//         // run.lat = lat;
//         // run.long = long;
//         // const location = {
//         //   type: 'Point',
//         //   coordinates: [long, lat],
//         //   crs: { type: 'name', properties: { name: 'EPSG:4326'} }
//         // }
//         //got to point where I think my route is working but I am unable to load any data into the location column. Everytime I do, I get this error
//         // that says I need to get ST_GeomFromGeoJSON but I don't know how
//         await run.update({ lat, long });
//       }
//     });
//   } catch (error) {
//     console.error('UPDATING ERROR WAS:>> ', error);
//   }
// }
// >>>>>>> master

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
