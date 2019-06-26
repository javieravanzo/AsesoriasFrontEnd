import {LOGOUT} from '../../types';

function setLogout (isLogin) {
  return {
    type: LOGOUT,
    isLogin
  };
}

export const logout = () => {
  return dispatch => {
    dispatch(setLogout(false));
    localStorage.clear();
  }
};