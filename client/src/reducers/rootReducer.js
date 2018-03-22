// each type of data/state should have its own individual reducer. This file will consolidate all reducers.
import { combineReducers } from 'redux';
import event from './eventReducer';
import friendsList from './friendReducer';
import userInfo from './userInfoReducer';

const rootReducer = combineReducers({
  event,
  friendsList,
  userInfo,
});

export default rootReducer;
