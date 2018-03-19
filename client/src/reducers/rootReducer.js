// each type of data/state should have its own individual reducer. This file will consolidate all reducers.
import { combineReducers } from 'redux';
import event from './eventReducer';

const rootReducer = combineReducers({
  event
});

export default rootReducer;