import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import user from './user';
import runs from './runs';
import singleRun from './singleRun';

const rootReducer = combineReducers({
  user: user,
  runs: runs,
  singleRun: singleRun,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  //applyMiddleware(thunkMiddleware)
);
const store = createStore(rootReducer, middleware);

export default store;
