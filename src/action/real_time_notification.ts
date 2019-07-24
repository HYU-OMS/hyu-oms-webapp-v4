/* To use Typescript types */
import { RealTimeNotificationItem } from '../custom-types';

const ORDER_UPDATE: string = 'ORDER_UPDATE';
const QUEUE_UPDATE: string = 'QUEUE_UPDATE';
const MENU_UPDATE: string = 'MENU_UPDATE';
const SETMENU_UPDATE: string = 'SETMENU_UPDATE';

const orderUpdate = (data: RealTimeNotificationItem) => {
  return {type: ORDER_UPDATE, data: data};
};

const queueUpdate = (data: RealTimeNotificationItem) => {
  return {type: QUEUE_UPDATE, data: data};
};

const menuUpdate = (data: RealTimeNotificationItem) => {
  return {type: MENU_UPDATE, data: data};
};

const setmenuUpdate = (data: RealTimeNotificationItem) => {
  return {type: MENU_UPDATE, data: data};
};

export {
  ORDER_UPDATE,
  QUEUE_UPDATE,
  MENU_UPDATE,
  SETMENU_UPDATE,
  orderUpdate,
  queueUpdate,
  menuUpdate,
  setmenuUpdate
};