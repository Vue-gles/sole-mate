import { combineReducers } from 'redux';

const initalState = {
  current: []
};

const sampleReducer = (state = initalState, action) => {
  switch (action.type) {
    default:
      return state
  }
};

export default combineReducers({
  sample: sampleReducer,
});