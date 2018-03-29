import initialState from './initialState';
import { FETCH_FRIENDS, RECEIVE_FRIENDS } from '../actions/actionTypes.js';

export default function friends(state = initialState.friendsList, action) {
  let newState;

  if (action.type === FETCH_FRIENDS) {
    return action;
  } else if (action.type === RECEIVE_FRIENDS) {
    newState = action.friendsList;
    return newState;
  }

  return state;
}
