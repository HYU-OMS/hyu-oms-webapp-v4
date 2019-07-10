import { combineReducers } from 'redux';
import auth from './auth';
import real_time_notification from './real_time_notification';

const HYU_OMS_APP = combineReducers({
  auth,
  real_time_notification
});

export default HYU_OMS_APP;