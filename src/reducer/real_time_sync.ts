import {
  GROUP_UPDATE,
  ORDER_UPDATE,
  QUEUE_UPDATE,
  MENU_UPDATE,
  SETMENU_UPDATE
} from '../action/realtimesync';

const initialState = {
  group_updated_list: [],
  order_updated_list: [],
  queue_updated_list: [],
  menu_updated_list: [],
  setmenu_updated_list: [],
};

const real_time_sync = (state = initialState, action: any) => {
  switch (action.type) {
    case GROUP_UPDATE:
      return Object.assign({}, state, {
        group_updated_list: [...state.group_updated_list, action.data]
      });

    case ORDER_UPDATE:
      return Object.assign({}, state, {
        order_updated_list: [...state.order_updated_list, action.data]
      });

    case QUEUE_UPDATE:
      return Object.assign({}, state, {
        queue_updated_list: [...state.queue_updated_list, action.data]
      });

    case MENU_UPDATE:
      return Object.assign({}, state, {
        menu_updated_list: [...state.menu_updated_list, action.data]
      });

    case SETMENU_UPDATE:
      return Object.assign({}, state, {
        setmenu_updated_list: [...state.setmenu_updated_list, action.data]
      });

    default:
      return state;
  }
};

export default real_time_sync;