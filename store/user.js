import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const updateUser = updatedUser => ({ type: UPDATE_USER, updatedUser });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get(`${process.env.BACKEND_HOST}/auth/me`);
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (inputs, method) => async dispatch => {
  let res;
  const {
    email,
    password,
    firstName,
    lastName,
    defaultAddress,
    imageUrl,
    avgPace,
    avgMileage,
    goal,
    bio,
  } = inputs;
  try {
    res = await axios.post(`${process.env.BACKEND_HOST}/auth/${method}`, {
      email,
      password,
      firstName,
      lastName,
      defaultAddress,
      imageUrl,
      avgPace,
      avgMileage,
      goal,
      bio,
    });
  } catch (authError) {
    console.log('error ----->>>>>>>', res);
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post(`${process.env.BACKEND_HOST}/auth/logout`);
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export const update = userInfo => async dispatch => {
  try {
    const { data } = await axios.put(
      `${process.env.BACKEND_HOST}/api/users`,
      userInfo
    );
    dispatch(updateUser(data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER:
      return action.updatedUser;
    default:
      return state;
  }
}
