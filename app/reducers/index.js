// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import shrineData from './network';

const rootReducer = combineReducers({
  // counter,
  shrineData,
  router,
});

export default rootReducer;
