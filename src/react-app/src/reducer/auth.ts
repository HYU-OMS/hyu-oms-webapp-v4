import { SIGN_IN, SIGN_OUT, SELECT_GROUP } from '../action/auth';

import { ReduxAuthState } from '../../../custom-types';

const initialState: ReduxAuthState = {
  'jwt': localStorage.getItem('jwt') || undefined,
  'group_id': localStorage.getItem('group_id') || undefined,
  'role': (localStorage.getItem('role') !== null) ? parseInt(<string>localStorage.getItem('role'), 10) : undefined,
  'api_url': ((): string => {
    if(process.env.NODE_ENV === 'development') {
      if(!Boolean(process.env.REACT_APP_API_URL)) {
        return 'http://localhost:3000';
      }
      else {
        return <string>process.env.REACT_APP_API_URL;
      }
    }
    else {
      if(!Boolean(process.env.REACT_APP_API_URL)) {
        return 'https://hyu-oms.com/api/v4';
      }
      else {
        return <string>process.env.REACT_APP_API_URL;
      }
    }
  })()
};

const auth = (state: ReduxAuthState = initialState, action: any) => {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        'jwt': action.jwt,
      });

    case SIGN_OUT:
      return Object.assign({}, state, {
        'jwt': null,
        'group_id': null,
        'role': null
      });

    case SELECT_GROUP:
      return Object.assign({}, state, {
        'group_id': action.group_id,
        'role': action.role
      });

    default:
      return state;
  }
};

export default auth;