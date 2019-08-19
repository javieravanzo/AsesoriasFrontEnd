///Types
import {loginTypes} from '../../types';

//Subcomponents
import { SUCCESS_MODAL } from '../../../../ui/components/subcomponents/modalMessages';
//import { ERROR_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

//Services
import { initializeClient } from '../../../../services/requestWrapper';
import loginServices from '../../../../services/general/loginServices'; 


function saveLocalStorage(access_token, expires_on, user_name, last_name,
                          role, roleName, email, userId){
  console.log(userId);
  localStorage.setItem('isLogged', true);
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('expires_on', expires_on);
  localStorage.setItem('user_name', user_name);
  localStorage.setItem('last_name', last_name);
  localStorage.setItem('email', email);
  //localStorage.setItem('role', role);
  localStorage.setItem('role_name', roleName);
  localStorage.setItem('user_id', userId);

  initializeClient();
};

export const login = (email, password) => {
  console.log("entrologin");
  return dispatch => {
    return loginServices.login(email, password)
        .then(response => {
          let data = response.data;
          let user = response.data.user_info;
          saveLocalStorage(data.access_token, data.expires_on, user.name, user.lastName,
                           user.roleId, user.roleName, user.email, user.userId);
          dispatch({
            type: loginTypes.LOGGING,
            payload: true
          });
        }).catch(err => {
          dispatch({
            type: loginTypes.LOGGING,
            payload: false,
          });
        });
  }
};

function setLogout (isLogin) {
  return {
    type: loginTypes.LOGOUT,
    isLogin
  };
}

export const logout = () => {
  return dispatch => {
    dispatch(setLogout(false));
    localStorage.clear();
  }
};

export const forgetPassword = (email) => {
  return dispatch => {
    return loginServices.forgetPassword(email)
      .then(response => {
        dispatch({
          type: loginTypes.RESET_PASSWORD,
          payload: response.data
        });
        SUCCESS_MODAL("Acción realizada satisfactoriamente", "Se te ha enviado un correo electrónico con las instrucciones necesarias para restablecer la contraseña.")
      }).catch(err => {
        dispatch({
          type: loginTypes.RESET_PASSWORD,
          payload: err
        });
      });
  }
};

export const changePassword = (data) => {
  return dispatch => {
    return loginServices.changePassword(data)
        .then(response => {
          dispatch({
            type: loginTypes.CONFIRM_PASSWORD,
            payload: response.data
          });
          SUCCESS_MODAL("Acción realizada satisfactoriamente", "La contraseña se ha cambiado existosamente. Puede iniciar con su nueva contraseña.")
        }).catch(err => {
          dispatch({
            type: loginTypes.CONFIRM_PASSWORD,
            payload: err,
          });
        });
  }
};