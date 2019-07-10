import {
  ORDER_UPDATE,
  QUEUE_UPDATE,
  MENU_UPDATE,
  SETMENU_UPDATE
} from '../action/real_time_notification';

const initialState = {
  order_last_updated: new Date(),
  queue_last_updated: new Date(),
  menu_last_updated: new Date(),
  setmenu_last_updated: new Date()
};

const real_time_sync = (state = initialState, action: any) => {
  switch (action.type) {
    case ORDER_UPDATE:
      return {...state,

      };

    case QUEUE_UPDATE:
      return {...state,

      };

    case MENU_UPDATE:
      return {...state,

      };

    case SETMENU_UPDATE:
      return {...state,

      };

    default:
      return state;
  }
};

export default real_time_sync;