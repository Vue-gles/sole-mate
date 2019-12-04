import axios from 'axios';

// ACTION TYPES
const GOT_RUNS = 'GOT_RUNS';
const MADE_NEW_RUN = 'GOT_NEW_RUN';

// ACTION CREATORS
const gotRuns = runs => ({
  type: GOT_RUNS,
  runs,
});

const madeNewRun = newRun => ({
  type: MADE_NEW_RUN,
  newRun,
});

// THUNK CREATORS
export const getRuns = (type, maxDistance, lat, long) => async dispatch => {
  try {
    let data;
    if (!maxDistance) {
      const response = await axios.get(
        `${process.env.BACKEND_HOST}/api/runs?type=${type}`
      );
      data = response.data;
    } else {
      const response = await axios.get(
        `${process.env.BACKEND_HOST}/api/runs?type=${type}&distance=${maxDistance}&lat=${lat}&long=${long}`
      );
      data = response.data;
    }

    dispatch(gotRuns(data));
  } catch (err) {
    console.log('Error:', err);
  }
};

// REDUCER
export default runs = (state = [], action) => {
  switch (action.type) {
    case GOT_RUNS:
      return action.runs;
    case MADE_NEW_RUN:
      const runs = state.runs ? state.runs : [];
      return runs.concat(action.newRun);
    default:
      return state;
  }
};
