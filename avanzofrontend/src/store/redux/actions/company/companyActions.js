///Types
import {companyTypes as C} from '../../types';

//Services
import companyService from '../../../../services/company/companyServices';

//Subcomponents
import { ERROR_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

export const getAllRequest = () => {
  return dispatch => {
    return companyService.getAllRequest(companyId)
      .then(response => {
        dispatch({
          type: C.GET_REQUEST_LIST,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_REQUEST_LIST,
          payload: err,
        });
        ERROR_MODAL('Error al traer la lista de solicitudes', err.data);
      });
  }
};
