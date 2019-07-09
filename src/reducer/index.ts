import { combineReducers } from 'redux';
import auth from './auth';
import real_time_sync from './real_time_sync';

const HYU_OMS_APP = combineReducers({
  auth,
  real_time_sync
});

export default HYU_OMS_APP;