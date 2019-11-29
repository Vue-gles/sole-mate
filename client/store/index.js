import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import user from './user';
import runs from './runs';
import singleRun from './singleRun';
import outgoing from './outgoing';
import incoming from './incoming';
import currentCoords from './currentCoord';
import messageThreads from './messageThreads';
import singleMessageThread from './singleMessageThread';

const rootReducer = combineReducers({
  user: user,
  runs: runs,
  singleRun: singleRun,
  outgoing: outgoing,
  incoming: incoming,
  currentCoords: currentCoords,
  messageThreads: messageThreads,
  singleMessageThread: singleMessageThread,
});
const middleware = composeWithDevTools(
  //applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  applyMiddleware(thunkMiddleware)
);
const store = createStore(rootReducer, middleware);

export default store;
