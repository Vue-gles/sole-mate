import axios from 'axios';

// ACTION TYPES
const GOT_RUNS = 'GOT_RUNS';
const MADE_NEW_RUN = "GOT_NEW_RUN"

// ACTION CREATORS
const gotRuns = runs => ({
  type: GOT_RUNS,
  runs,
});

const madeNewRun = newRun => ({
  type: MADE_NEW_RUN,
  newRun
})

// THUNK CREATORS
export const getRuns = type => async dispatch => {
  try {
    const { data } = await axios.get(
      `${process.env.BACKEND_HOST}/api/runs?type=${type}`
    );
    dispatch(gotRuns(data));
  } catch (err) {
    console.log('Error:', err);
  }
};

export const createRunThunk = runInfo => {
  return async (dispatch) => {
    try {
      const {street, city, state, country, lattitude, longitude, endTime, startTime, date, creatorId} = runInfo
      const {data} = await axios.post(`${process.env.BACKEND_HOST}/api/runs`, {
        locationName: street,
        startTimeframe: startTime,
        endTimeframe: endTime,
        creatorId: 1
      })
      console.log('YAYYYY I GOT BACK DATA AND IT IS', data)
      dispatch(madeNewRun(data))
    } catch (err) {
      console.log('Error:', err)
    }
  }
}

// REDUCER
export default runs = (state = [], action) => {
  switch (action.type) {
    case GOT_RUNS:
      return action.runs;
    case MADE_NEW_RUN:
      const runs = state.runs ? state.runs : []
      // return [...state.runs, action.newRun]
      return runs.concat(action.newRun)
    default:
      return state;
  }
};
