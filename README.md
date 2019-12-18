# SoleMate

SoleMate is a fitness based social media app that leverages geolocation technology to match users with runners in their area. Users are able to message and request runs with people they've matched with, generate customized routes, and track running info in real-time. Users are able to access their past runs, where they can see a map of the path they ran, as well as information about who they ran with. SoleMate also collects fitness data about each user's pace, mileage, and the number of runs completed each month, so users can stay updated on their goal progress. When users aren't on the app, SoleMate alerts them to incoming requests and messages via push notifications.

Visit [SoleMate](https://expo.io/@mdonnelly/sole-mate-app) to try us out!

## Table of Contents

- [SoleMate](#SoleMate)
- [Table of Contents](#Table-of-Contents)
- [Download](#Download)
- [Team](#Team)
  - [Megan Donnelly](#Megan-Donnelly)
  - [Jake Rothenberg](#Jake-Rothenberg)
  - [Matthew Chen](#Matthew-Chen)
  - [Gerard Shapiro](#Gerard-Shapiro)
- [Tech Stack](#Tech-Stack)
  - [React Native](#React-Native)
  - [Redux](#Redux)
  - [Socket.io](#Socket.io)
  - [Expo](#Expo)
  - [Google Maps API](#Google-Maps-API)
  - [Node.js](#Node.js)
  - [Express](#Express)
  - [PostgreSQL](#PostgreSQL)
- [Tutorial](#Tutorial)
- [Examples](#Examples)

## Download

Step by step guide for downloading repo:

```
cd <directory you want to download to>

git clone https://github.com/Vue-gles/sole-mate.git

In one terminal:

cd server

npm install

npm start

In another terminal:

cd client-expo

npm install

npm start

Go to http://localhost:19002 to use SoleMate!
```

## Team

### `Megan Donnelly`

Github: https://github.com/megan-donnelly

LinkedIn: https://www.linkedin.com/in/megan-donnelly1/

### `Jake Rothenberg`

Github: https://github.com/jroth125

LinkedIn: https://www.linkedin.com/in/jake-rothenberg/

### `Matthew Chen`

Github: https://github.com/mc2green

LinkedIn: https://www.linkedin.com/in/matthew-chen-2mc2/

### `Gerard Shapiro`

Github: https://github.com/gshapiro1

LinkedIn: https://www.linkedin.com/in/gerard-shapiro-552734183/

## Tech Stack

Technologies used in this project:

### `React Native`

https://react-native.org/

- React Native is a JavaScript library for building mobile applications that's indistinguishable from an app built using Objective-C or Java

- React Native will efficiently update and render only the components that need to be re-rendered.

- React Native is component-based and allows for each component to manage their own state.

### `Redux`

https://redux.js.org/

- Redux is an open-source JavaScript library for state management.

- Redux works together with React Native and Node to build complex user interfaces and retrieve data from the database, while easily managing state.

### `Socket.io`

https://socket.io/

- Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server

- Connections are established even in the presence of proxies and load balancers, and personal firewalls and antivirus software

### `Expo`

https://expo.io/

- Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.

### `Google Maps API`

https://developers.google.com/maps/documentation/javascript/tutorial

- Google Maps API lets you customize maps with your own content and imagery for display on web pages and mobile devices

- Google Places Autocomplete feature automatically returns location suggestions while users type

- Google Routes Directions provides directions for transit, biking, driving, and walking (or running!).

### `Node.js`

https://nodejs.org/en/

- Node is a JavaScript runtime environment built on Chrome's V8 JavaScript engine

### `Express`

https://expressjs.com/

- Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### `PostgreSQL`

https://www.postgresql.org/

- PostgreSQL is an open source object-relational database system that uses and extends the SQL language

## Tutorial

After logging in, you can choose to run now or run later.

If you choose to run later, you'll fill out information about when an where you want to run.

<img src='https://github.com/Vue-gles/sole-mate/blob/master/client-expo/assets/gifs/runform.gif' width='400' />

Click into a run posting to see more information before requesting a run.

After your request is accepted, message your running mate to iron out the details or your run.

<img src='https://github.com/Vue-gles/sole-mate/blob/master/client-expo/assets/gifs/request_run.gif' width='400' />

When it's time to run, click 'Start Run' on your upcoming run to be taken to the map view.

If you and your running mate don't know where you want to run, you can generate a custom route.

<img src='https://github.com/Vue-gles/sole-mate/blob/master/client-expo/assets/gifs/custom_routes.gif' width='400' />

Or hide the the generated route and click 'Start' to track your run.

When you're finished running, click 'Stop' and 'Save' to save your run.

<img src='https://github.com/Vue-gles/sole-mate/blob/master/client-expo/assets/gifs/track_run.gif' width='400' />

Relive the magic by viewing your past runs, where you can see a map of the path you ran, as well as information about how far you went and how long it took.

<img src='https://github.com/Vue-gles/sole-mate/blob/master/client-expo/assets/gifs/past_runs.gif' width='400' />

## Examples

<img src='https://github.com/Vue-gles/sole-mate/blob/master/client-expo/assets/images/home.png' width='400' />

<img src='https://github.com/Vue-gles/sole-mate/blob/master/client-expo/assets/images/map.png' width='400' />
