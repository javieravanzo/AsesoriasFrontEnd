///Types
import {customerTypes as C} from '../../types';

//Services
import registerService from '../../../../services/customer/registerServices';
import customerService from '../../../../services/customer/customerServices';

//Subcomponents
import { ERROR_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

export const getDocumentsTypes = () => {
  return dispatch => {
    return registerService.getDocumentTypes()
      .then(response => {
        dispatch({
          type: C.GET_DOCUMENTS_TYPE,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_DOCUMENTS_TYPE,
          payload: err,
        });
        ERROR_MODAL('Error al traer los tipos de documentos', err.data);
      });
  }
};

export const register = (data) => {
  return dispatch => {
    return registerService.register(data)
      .then(response => {
        dispatch({
          type: C.REGISTER,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.REGISTER,
          payload: err,
        });
        ERROR_MODAL('Error al registrar el usuario', err);
      });
  }
};

export const getHomeData = (customerId) => {
  return dispatch => {
    return customerService.getHomeData(customerId)
      .then(response => {
        dispatch({
          type: C.GET_HOME_DATA,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_HOME_DATA,
          payload: err,
        });
        ERROR_MODAL('Error al traer la información de inicio', err.message);
      });
  };
};

export const getRequestData = (customerId) => {
  return dispatch => {
    return customerService.getRequestData(customerId)
      .then(response => {
        dispatch({
          type: C.GET_REQUEST_DATA,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_REQUEST_DATA,
          payload: err,
        });
        ERROR_MODAL('Error al traer la información particular de la solicitud', err);
      });
  };
};  

export const getOutlayData = () => {
  return dispatch => {
    return customerService.getOutLayData()
      .then(response => {
        dispatch({
          type: C.GET_OUTLAY_DATA,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_OUTLAY_DATA,
          payload: err,
        });
        ERROR_MODAL('Error al traer la información del desembolso', err);
      });
  };
};  

export const getOultayDatesList = (customerId, split, quantity) => {
  return dispatch => {
    return customerService.getOultayDatesList(customerId, split, quantity)
      .then(response => {
        dispatch({
          type: C.GET_OUTLAY_DATESLIST,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_OUTLAY_DATESLIST,
          payload: err,
        });
        ERROR_MODAL('Error al traer la información de las fechas desembolso.', err);
      });
  };
};  

export const generateDocuments = (customerId, split, quantity) => {
  return dispatch => {
    return customerService.generateDocuments(customerId, split, quantity)
      .then(response => {
        dispatch({
          type: C.GENERATE_DOCUMENTS,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GENERATE_DOCUMENTS,
          payload: err,
        });
        ERROR_MODAL('Error al generar los documentos necesarios.', err);
      });
  };
};  

export const createRequest = (data) => {
  return dispatch => {
    return customerService.createRequest(data)
      .then(response => {
        dispatch({
          type: C.CREATE_REQUEST,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.CREATE_REQUEST,
          payload: err,
        });
        ERROR_MODAL('Error al crear la solicitud de préstamo.', err);
      });
  }
};

export const getAllTransactions = (customerId) => {
  return dispatch => {
    return customerService.getAllTransactions(customerId)
      .then(response => {
        dispatch({
          type: C.GET_TRANSACTIONS_LIST,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_TRANSACTIONS_LIST,
          payload: err,
        });
        ERROR_MODAL('Error al traer la lista de transacciones.', err);
      });
  };
};  

export const getAllRequest = (customerId) => {
  return dispatch => {
    return customerService.getAllRequest(customerId)
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
        ERROR_MODAL('Error al traer la lista de solicitudes .', err);
      });
  };
};  