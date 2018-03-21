import initialState from './initialState';
import { FETCH_FRIENDS, RECEIVE_FRIENDS } from '../actions/actionTypes.js';

export default function friends(state = initialState.friendsList, action) {
  let newState;

  if (action.type === FETCH_FRIENDS) {
    console.log(`FETCH_FRIEND action`);
    return action;
  } else if (action.type === RECEIVE_FRIENDS) {
    console.log(`RECEIVE_FRIEND action`);
    newState = action.friendsList;
    return newState;
  }

  console.log('friendReducer default...');
  return state;
}
