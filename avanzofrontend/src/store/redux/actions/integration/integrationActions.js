///Types
import {integrationTypes as C} from '../../types';

//Subcomponents
import { WARNING_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

//Services
import integrationService from '../../../../services/integration/integrationServices'; 
import { initializeClient } from '../../../../services/requestWrapper';

function saveLocalStorage(access_token, expires_on, user_name, roleId, email, userId){

  //localStorage.setItem('access_token', access_token);
  localStorage.setItem('expires_on', expires_on);
  localStorage.setItem('user_name', user_name);
  localStorage.setItem('role_id', roleId);
  localStorage.setItem('email', email);  
  localStorage.setItem('user_id', userId);

  initializeClient();
};

export const integrationRegister = (data) => {
  return dispatch => {
    return integrationService.integrationRegistration(data)
      .then(response => {
        localStorage.setItem('access_token', response.data.data.access_token);
        let data = response.data.data;
        let user_info = data.user_info;
        saveLocalStorage(data.access_token, data.expires_on, user_info.name, user_info.Role_idRole, user_info.email, user_info.idUser);
        dispatch({
          type: C.INTEGRATION_REGISTER,
          token: data.access_token,
          payload: true,
        });
      }).catch(err => {
        dispatch({
          type: C.INTEGRATION_REGISTER,
          payload: false,
        });
        WARNING_MODAL('Advertencia',  'Por favor, regístrate en nuestro portal');
      });
  }
};

