import axios from 'axios';

// ACTION TYPE
const GOT_SINGLE_RUN = 'GOT_SINGLE_RUN';

// ACTION CREATOR
const gotSingleRun = run => ({
  type: GOT_SINGLE_RUN,
  run,
});

// THUNK CREATOR
export const getSingleRun = id => async dispatch => {
  try {
    const { data } = await axios.get(
      `${process.env.BACKEND_HOST}/api/runs/${id}`
    );
    dispatch(gotSingleRun(data));
  } catch (err) {
    console.log('Error:', err);
  }
};

// REDUCER
export default singleRun = (state = {}, action) => {
  switch (action.type) {
    case GOT_SINGLE_RUN:
      return action.run;
    default:
      return state;
  }
};
