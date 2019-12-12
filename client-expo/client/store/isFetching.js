const GOT_UPCOMING_RUNS_FETCHING_STATUS = 'GOT_UPCOMING_RUNS_FETCHING_STATUS';
const GOT_INCOMING_NOTIFICATIONS_FETCHING_STATUS =
  'GOT_NOTIFICATIONS_FETCHING_STATUS';
const GOT_OUTGOING_NOTIFICATIONS_FETCHING_STATUS =
  'GOT_OUTGOING_NOTIFICATIONS_FETCHING_STATUS';
const GOT_MESSAGE_THREAD_STATUS = 'GOT_MESSAGE_THREAD_STATUS';
const GOT_ALL_RUNS_STATUS = 'GOT_ALL_RUNMS_STATUS';

export const gotUpcomingRunsFetchingStatus = isFetching => {
  return {
    type: GOT_UPCOMING_RUNS_FETCHING_STATUS,
    isFetching,
  };
};

export const gotAllRunsStatus = isFetching => {
  return {
    type: GOT_ALL_RUNS_STATUS,
    isFetching,
  };
};

export const gotIncomingNotificationsFetchingStatus = isFetching => {
  return {
    type: GOT_INCOMING_NOTIFICATIONS_FETCHING_STATUS,
    isFetching,
  };
};

export const gotOutgoingNotificationsFetchingStatus = isFetching => {
  return {
    type: GOT_OUTGOING_NOTIFICATIONS_FETCHING_STATUS,
    isFetching,
  };
};

export const gotMessageThreadStatus = isFetching => {
  return {
    type: GOT_MESSAGE_THREAD_STATUS,
    isFetching,
  };
};

const ogState = {
  upcomingRuns: true,
  outgoing: true,
  incoming: true,
  messageThreads: true,
};

export default isFetching = function(state = ogState, action) {
  switch (action.type) {
    case GOT_UPCOMING_RUNS_FETCHING_STATUS:
      return { ...state, upcomingRuns: action.isFetching };
    case GOT_INCOMING_NOTIFICATIONS_FETCHING_STATUS:
      return { ...state, incoming: action.isFetching };
    case GOT_OUTGOING_NOTIFICATIONS_FETCHING_STATUS:
      return { ...state, outgoing: action.isFetching };
    case GOT_MESSAGE_THREAD_STATUS:
      return { ...state, messageThreads: action.isFetching };
    case GOT_ALL_RUNS_STATUS:
      return { ...state, allRuns: action.isFetching };
    default:
      return state;
  }
};
