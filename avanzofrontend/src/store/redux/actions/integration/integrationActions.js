///Types
import {integrationTypes as C} from '../../types';

//Subcomponents
import { SUCCESS_MODAL, ERROR_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

//Services
import integrationService from '../../../../services/integration/integrationServices'; 

function saveLocalStorage(access_token, expires_on, user_name, roleId, roleName, email, userId){

  //localStorage.setItem('access_token', access_token);
  localStorage.setItem('expires_on', expires_on);
  localStorage.setItem('user_name', user_name);
  localStorage.setItem('role_id', roleId);
  localStorage.setItem('role_name', roleName);
  localStorage.setItem('email', email);  
  localStorage.setItem('user_id', userId);

};

export const integrationRegister = (data) => {
  return dispatch => {
    return integrationService.integrationRegistration(data)
      .then(response => {
        localStorage.setItem('access_token', response.data.data.access_token);
        let data = response.data.data;
        let user_info = data.user_info;
        saveLocalStorage(data.access_token, data.expires_on, user_info.name, user_info.roleId,
                         user_info.roleName, user_info.email, user_info.idUser);
        dispatch({
          type: C.INTEGRATION_REGISTER,
          payload: true,
          token: data.access_token,
        });
        
        SUCCESS_MODAL("Acción realizada exitosamente", response.data.message);
      }).catch(err => {
        dispatch({
          type: C.INTEGRATION_REGISTER,
          payload: false,
          correct: false,
        });
        ERROR_MODAL('Error al registrar el usuario',  '.');
      });
  }
};

