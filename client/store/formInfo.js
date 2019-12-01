import axios from 'axios'

const GOT_RUN_COORDINATES = 'GOT_COORDINATES';

const gotRunCoordinates = runCoordinates => {
  return {
    type: GOT_RUN_COORDINATES,
    runCoordinates,
  };
};

const initialState = {
  runCoordinates: [],
};


// const getRunCoordinatesThunk = () => {
//     return async dispatch => {
//         const 
//     }
// }

export default formInfo = (state = initialState, action) => {
  switch (action.type) {
    case GOT_RUN_COORDINATES:
      return { ...state, runCoordinates: action.runCoordinates };
    default:
      return state;
  }
};
