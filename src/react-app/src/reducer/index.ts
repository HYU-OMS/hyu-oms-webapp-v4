import { combineReducers } from 'redux';
import Auth from './auth';
import RealTimeSync from './realtimesync';

const HYU_OMS_APP = combineReducers({
  Auth,
  RealTimeSync
});

export default HYU_OMS_APP;