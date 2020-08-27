///Types
import {customerTypes as C} from '../../types';

//Services
import registerService from '../../../../services/customer/registerServices';
import customerService from '../../../../services/customer/customerServices';

//Subcomponents
import { ERROR_MODAL, SUCCESS_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

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
          payload: response.data,
          correct: true,
        });
        SUCCESS_MODAL("Acción realizada exitosamente", response.data.message);
      }).catch(err => {
        dispatch({
          type: C.REGISTER,
          payload: err,
          correct: false,
        });
        ERROR_MODAL('Error al registrar el usuario',  err.request.response.message);
      });
  }
};

export const getHomeData = () => {
  return dispatch => {
    return customerService.getHomeData()
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
        ERROR_MODAL('Error al traer la información de inicio', err.data.message);
      });
  };
};

export const getRequestData = (customerId, token) => {
  return dispatch => {
    return customerService.getRequestData(customerId, token)
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
        ERROR_MODAL('Error al traer la información particular de la solicitud', err.data);
      });
  };
};  

export const getOutlayData = (customerId, token) => {
  return dispatch => {
    return customerService.getOutLayData(customerId, token)
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
        ERROR_MODAL('Error al traer la información del desembolso', err.data);
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
        ERROR_MODAL('Error al traer la información de las fechas desembolso.',  err.data.message);
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
        ERROR_MODAL('Error al generar los documentos necesarios.',  err.data.message);
      });
  };
};  

export const resetValue = () => {
  return dispatch => {
    dispatch({
      type: C.RESET_VALUES
    });
  }
}

export const createRequest = (data, token) => {

  
  /*let img_b64 = data.file;
  let png = img_b64.split(',')[1];

  let the_file = new Blob([window.atob(png)],  {type: 'image/png', encoding: 'utf-8'});

  let fr = new FileReader();
  fr.onload = function ( oFREvent ) {
      let v = oFREvent.target.result.split(',')[1]; // encoding is messed up here, so we fix it
      v = atob(v);
      let good_b64 = btoa(decodeURIComponent(escape(v)));
      document.getElementById("uploadPreview").src = "data:image/png;base64," + good_b64;
  };
  fr.readAsDataURL(the_file);*/

  return dispatch => {
    return customerService.createRequest(data, token)
      .then(response => {
        dispatch({
          type: C.CREATE_REQUEST,
          payload: response.data,
          correct: true,
        });
        SUCCESS_MODAL('Acción realizada exitosamente', response.data.message);
        dispatch(resetValue());
      }).catch(err => {
        dispatch({
          type: C.CREATE_REQUEST,
          payload: err,
          correct: false
        });
        ERROR_MODAL('Error al crear la solicitud de préstamo.', err.data.message);
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
        ERROR_MODAL('Error al traer la lista de solicitudes pendientes.', err.data);
      });
  };
};  

export const getAllOutlayedRequest = (customerId) => {
  return dispatch => {
    return customerService.getAllRequestWasOutlayed(customerId)
      .then(response => {
        dispatch({
          type: C.GET_OUTLAYED_REQUEST_LIST,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_OUTLAYED_REQUEST_LIST,
          payload: err,
        });
        ERROR_MODAL('Error al traer la lista de solicitudes desembolsadas.', err.data);
      });
  };
};  

export const getAllRequestsWasRejected = (customerId) => {
  return dispatch => {
    return customerService.getAllRequestWasRejected(customerId)
      .then(response => {
        dispatch({
          type: C.GET_REJECTED_REQUEST_LIST,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_REJECTED_REQUEST_LIST,
          payload: err,
        });
        ERROR_MODAL('Error al traer la lista de solicitudes rechazadas.', err.data);
      });
  };
};  

export const getAccountDetail = () => {
  return dispatch => {
    return customerService.getAccountDetail()
      .then(response => {
        dispatch({
          type: C.GET_ACCOUNT_DETAIL,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_ACCOUNT_DETAIL,
          payload: err,
        });
        ERROR_MODAL('Error al traer el detalle de cuenta.', err.data);
      });
  };
};  

export const generateCodes = (email, phonenumber, clientid) => {
  return dispatch => {
    return customerService.generateCodes(email, phonenumber, clientid)
      .then(response => {
        dispatch({
          type: C.GENERATE_CODES,
          payload: response.data,
          code: true
        });
      }).catch(err => {
        dispatch({
          type: C.GENERATE_CODES,
          payload: err.data,
          code: false
        });
        ERROR_MODAL('Error al generar los códigos de validación.', err.data);
      });
  };
};  

export const checkCodes = (userid, phonecode, emailcode) => {
  console.log("Actions PC", phonecode, "EC", emailcode);
  return dispatch => {
    return customerService.checkCodes(userid, phonecode, emailcode)
      .then(response => {
        dispatch({
          type: C.CHECK_CODES,
          payload: response.data,
          response: true
        });
      }).catch(err => {
        dispatch({
          type: C.CHECK_CODES,
          payload: err.data,
          response: false
        });
        ERROR_MODAL('Error al validar los códigos generados.', err.data);
      });
  };
};  