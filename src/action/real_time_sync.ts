const GROUP_UPDATE: string = 'GROUP_UPDATE';
const ORDER_UPDATE: string = 'ORDER_UPDATE';
const QUEUE_UPDATE: string = 'QUEUE_UPDATE';
const MENU_UPDATE: string = 'MENU_UPDATE';
const SETMENU_UPDATE: string = 'SETMENU_UPDATE';

const groupUpdate = (data: any) => {
  return {type: GROUP_UPDATE, data: data};
};

const orderUpdate = (data: any) => {
  return {type: ORDER_UPDATE, data: data};
};

const queueUpdate = (data: any) => {
  return {type: QUEUE_UPDATE, data: data};
};

const menuUpdate = (data: any) => {
  return {type: MENU_UPDATE, data: data};
};

const setmenuUpdate = (data: any) => {
  return {type: MENU_UPDATE, data: data};
};

export {
  GROUP_UPDATE,
  ORDER_UPDATE,
  QUEUE_UPDATE,
  MENU_UPDATE,
  SETMENU_UPDATE,
  groupUpdate,
  orderUpdate,
  queueUpdate,
  menuUpdate,
  setmenuUpdate
};