///Types
import {loginTypes} from '../../types';
import {customerTypes as C} from '../../types';

//Subcomponents
import { SUCCESS_MODAL, ERROR_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

//Services
import { initializeClient } from '../../../../services/requestWrapper';
import loginServices from '../../../../services/general/loginServices'; 
import registerService from '../../../../services/customer/registerServices'; 

function saveLocalStorage(access_token, expires_on, user_name, roleId, roleName, email, userId, menu){

  localStorage.setItem('access_token', access_token);
  localStorage.setItem('expires_on', expires_on);
  localStorage.setItem('user_name', user_name);
  localStorage.setItem('role_id', roleId);
  localStorage.setItem('email', email);  
  localStorage.setItem('user_id', userId);
  localStorage.setItem('menu', menu);

  initializeClient();
};

//Exports login function.
export const login = (email, password) => {
  return dispatch => {
    return loginServices.login(email, password)
        //Response
        .then(response => {
          let data = response.data;
          let user_info = response.data.user_info;
          saveLocalStorage(data.access_token, data.expires_on, user_info.name, user_info.roleId,
             user_info.roleName, user_info.email, user_info.idUser, JSON.stringify(data.menu));
          dispatch({
            type: loginTypes.LOGGING,
            payload: true,
          });
          //SUCCESS_MODAL("Acción realizada satisfactoriamente", 
          //"Ha ingresado a nuestra plataforma exitosamente.");
        //Manejo error
        }).catch(err => {
          dispatch({
            type: loginTypes.LOGGING,
            payload: false,
          });
          let error = err.data === undefined ? "No es posible acceder a la plataforma en este momento." : err.data.message;
          ERROR_MODAL("Error al realizar la acción", error);
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

export const changePassword = (data, token) => {
  return dispatch => {
    return loginServices.changePassword(data, token)
        .then(response => {
          dispatch({
            type: loginTypes.CONFIRM_PASSWORD,
            payload: response.data,
            correct: true,
          });
          SUCCESS_MODAL("Acción realizada satisfactoriamente", "La contraseña se ha cambiado existosamente. Puedes iniciar con tu nueva contraseña.")
        }).catch(err => {
          dispatch({
            type: loginTypes.CONFIRM_PASSWORD,
            payload: err,
            correct: false,
          });
        });
  }
};

export const newRegister = (data) => {
  return dispatch => {
    return registerService.newRegister(data)
      .then(response => {
        dispatch({
          type: C.NEW_REGISTER,
          payload: true,
          correct: true,
        });
        SUCCESS_MODAL("Acción realizada exitosamente", response.data.message);
      }).catch(err => {
        dispatch({
          type: C.NEW_REGISTER,
          payload: false,
          correct: false,
        });
        ERROR_MODAL('Error al registrar el usuario',  err.data.message);
      });
  }
};

export const getCompanies = () => {
  return dispatch => {
    return registerService.getCompanies()
      .then(response => {
        dispatch({
          type: C.GET_COMPANIES,
          payload: response.data,
        });
        //SUCCESS_MODAL("Acción realizada exitosamente", response.data.message);
      }).catch(err => {
        dispatch({
          type: C.GET_COMPANIES,
          payload: [],
        });
        ERROR_MODAL('Ocurrió un error al traer el listado de empresas',  'No es posible traer el listado de empresas.');
      });
  }
};