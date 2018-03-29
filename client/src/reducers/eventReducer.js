// reducer for all things related to event data.
// TODO
import initialState from './initialState';
import { FETCH_EVENT, RECEIVE_EVENT } from '../actions/actionTypes.js';

export default event = (state = initialState.event, action) => {
  let newState;
  if (action.type === FETCH_EVENT) {
    return action;
  } else if (action.type === RECEIVE_EVENT) {
    newState = action.event;
    return newState;
  }

  return state;
};
