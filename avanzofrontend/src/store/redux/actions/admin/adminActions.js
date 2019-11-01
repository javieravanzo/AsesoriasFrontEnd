///Types
import {adminTypes as C} from '../../types';

//Services
import adminServices from '../../../../services/admin/adminServices';

//Subcomponents
import { ERROR_MODAL, SUCCESS_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

export const registerAdmin = (data) => {
  return dispatch => {
    return adminServices.registerAdmin(data)
      .then(response => {
        dispatch({
          type: C.REGISTER_ADMIN,
          payload: true
        });
        //console.log("Success", response);
        SUCCESS_MODAL("Acción realizada satisfactoriamente", response.data.message)
      }).catch(err => {
        
        dispatch({
          type: C.REGISTER_ADMIN,
          payload: false,
        });
        if(err.data){
          ERROR_MODAL('Error al registrar el administrador', err.data.message);
        }
      });
  }
};

export const createCompany = (data) => {
  return dispatch => {
    return adminServices.createCompany(data)
      .then(response => {
        dispatch({
          type: C.CREATE_COMPANY,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.CREATE_COMPANY,
          payload: err,
        });
        ERROR_MODAL('Error al crear la empresa', err.data);
      });
  }
};

export const createCustomer = (data) => {
  return dispatch => {
    return adminServices.createCustomer(data)
      .then(response => {
        dispatch({
          type: C.CREATE_CUSTOMER,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.CREATE_CUSTOMER,
          payload: err,
        });
        ERROR_MODAL('Error al crear múltiples clientes', err.data);
      });
  }
};

export const createMultipleCustomer = (data) => {
  return dispatch => {
    return adminServices.createMultipleCustomer(data)
      .then(response => {
        dispatch({
          type: C.CREATE_MULTIPLE_CUSTOMER,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.CREATE_MULTIPLE_CUSTOMER,
          payload: err,
        });
        ERROR_MODAL('Error al crear múltiples clientes', err.data);
      });
  }
};

export const getAllRequest = (userId) => {
  return dispatch => {
    return adminServices.getAllRequest(userId)
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

export const getAllRequestToApprove = () => {
  return dispatch => {
    return adminServices.getAllRequestToApprove()
      .then(response => {
        dispatch({
          type: C.GET_REQUEST_TO_APPROVE,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_REQUEST_TO_APPROVE,
          payload: err,
        });
        ERROR_MODAL('Error al traer la lista de solicitudes para aprobar', err.data.message);
      });
  }
};

export const getAllRequestToOutLay = (userId) => {
  return dispatch => {
    return adminServices.getAllRequestToOutLay(userId)
      .then(response => {
        dispatch({
          type: C.GET_REQUEST_TO_OUTLAY,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_REQUEST_TO_OUTLAY,
          payload: err,
        });
        ERROR_MODAL('Error al traer la lista de solicitudes para desembolsar', err.data);
      });
  }
};