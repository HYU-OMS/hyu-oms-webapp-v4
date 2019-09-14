const SIGN_IN: string = 'SIGN_IN';
const SIGN_OUT: string = 'SIGN_OUT';
const SELECT_GROUP: string = 'SELECT_GROUP';

const signIn = (jwt: string): any => {
  localStorage.setItem('jwt', jwt);

  return {type: SIGN_IN, jwt: jwt};
};

const signOut = (): any => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('group_id');
  localStorage.removeItem('role');

  return {type: SIGN_OUT};
};

const selectGroup = (group_id: number, role: number): any => {
  localStorage.setItem('group_id', group_id.toString(10));
  localStorage.setItem('role', role.toString(10));

  return {type: SELECT_GROUP, group_id: group_id, role: role};
};

export {
  SIGN_IN,
  SIGN_OUT,
  SELECT_GROUP,
  signIn,
  signOut,
  selectGroup
}