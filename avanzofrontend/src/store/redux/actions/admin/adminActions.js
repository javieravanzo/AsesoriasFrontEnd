///Types
import {adminTypes as C} from '../../types';

//Services
import adminServices from '../../../../services/admin/adminServices';

//Subcomponents
import { ERROR_MODAL, SUCCESS_MODAL, CONFIRM_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

export const resetValue = () => {
  return dispatch => {
    dispatch({
      type: C.RESET_VALUES
    });
  }
}

export const registerAdmin = (data) => {
  return dispatch => {
    return adminServices.registerAdmin(data)
      .then(response => {
        dispatch({
          type: C.REGISTER_ADMIN,
          payload: true
        });
        SUCCESS_MODAL("Acción realizada satisfactoriamente", response.data.message);
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
        dispatch(getAllCompanies());
        dispatch({
          type: C.CREATE_COMPANY,
          payload: response.data,
          correct: true,
        });
        //SUCCESS_MODAL('Acción realizada exitosamente', response.data.message);
        CONFIRM_MODAL('Acción realizada exitosamente', response.data.message);
      }).catch(err => {
        console.log("Error", err);
        dispatch({
          type: C.CREATE_COMPANY,
          payload: err,
          correct: false,
        });
        ERROR_MODAL('Error al crear la empresa', err.data.message);
      });
  }
};

export const updateCompany = (data) => {
  return dispatch => {
    return adminServices.updateCompany(data)
      .then(response => {
        dispatch(getAllCompanies());
        dispatch({
          type: C.UPDATE_COMPANY,
          payload: response.data,
          correct: true,
        });
        SUCCESS_MODAL('Acción realizada exitosamente', response.data.message);
      }).catch(err => {
        dispatch({
          type: C.UPDATE_COMPANY,
          payload: err,
          correct: false,
        });
        ERROR_MODAL('Error al editar la empresa', err.data.message);
      });
  }
};

export const createCustomer = (data) => {
  return dispatch => {
    return adminServices.createCustomer(data)
      .then(response => {
        dispatch({
          type: C.CREATE_CUSTOMER,
          payload: response.data,
          correct: true,
        });
        //SUCCESS_MODAL("Acción realizada exitosamente", "El cliente ha sido creado satisfactoriamente");
        CONFIRM_MODAL("Acción realizada exitosamente", "El cliente ha sido creado satisfactoriamente");
      }).catch(err => {
        dispatch({
          type: C.CREATE_CUSTOMER,
          payload: err,
          correct: false,
        });
        ERROR_MODAL('Error al crear el cliente', err.data.message);
      });
  }
};

export const updateCustomer = (data) => {
  return dispatch => {
    return adminServices.updateCustomer(data)
      .then(response => {
        dispatch(getAllCustomers());
        dispatch({
          type: C.UPDATE_CUSTOMER,
          payload: response.data
        });
        SUCCESS_MODAL("Acción realizada exitosamente", "El cliente ha sido actualizado satisfactoriamente");
      }).catch(err => {
        dispatch({
          type: C.UPDATE_CUSTOMER,
          payload: err,
        });
        ERROR_MODAL('Error al actualizar el cliente', err.data.message);
      });
  }
};

export const activateCustomer = (clientId, status) => {
  return dispatch => {
    return adminServices.activateCustomer(clientId, status)
      .then(response => {
        dispatch(getAllCustomers());
        dispatch({
          type: C.ACTIVATE_CUSTOMER,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.ACTIVATE_CUSTOMER,
          payload: err,
        });
        ERROR_MODAL('Error al activar el cliente', err.data);
      });
  }
};

export const activateCompany = (clientId, status) => {
  return dispatch => {
    return adminServices.activateCompany(clientId, status)
      .then(response => {
        dispatch(getAllCompanies());
        dispatch({
          type: C.ACTIVATE_COMPANY,
          payload: response.data
        });
        SUCCESS_MODAL("Acción realizada satisfactoriamente", response.data.message);
      }).catch(err => {
        dispatch({
          type: C.ACTIVATE_COMPANY,
          payload: err,
        });
        ERROR_MODAL('Error al activar la empresa.', err.data);
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
        ERROR_MODAL('Error al traer la lista de solicitudes para desembolsar', err.data.message);
      });
  }
};

export const getAllCompanies = ( ) => {
  return dispatch => {
    return adminServices.getAllCompanies( )
      .then(response => {
        dispatch({
          type: C.GET_ALL_COMPANIES,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_ALL_COMPANIES,
          payload: err,
        });
        ERROR_MODAL('Error al traer la lista de empresas', err.data);
      });
  }
};

export const getCompanyWithSalary = (companyid) => {
  return dispatch => {
    return adminServices.getAllCompaniesWithSalaries(companyid)
      .then(response => {
        dispatch({
          type: C.GET_COMPANY_WITH_SALARY,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_COMPANY_WITH_SALARY,
          payload: err,
        });
        ERROR_MODAL('Error al traer la información de la empresa', err.data);
      });
  }
};

export const getAllCustomers = ( ) => {
  return dispatch => {
    return adminServices.getAllCustomers( )
      .then(response => {
        dispatch({
          type: C.GET_ALL_CUSTOMERS,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_ALL_CUSTOMERS,
          payload: err,
        });
        ERROR_MODAL('Error al traer la lista de clientes', err.data);
      });
  }
};

export const getAllCustomersToApprove = ( ) => {
  return dispatch => {
    return adminServices.getAllCustomersToApprove( )
      .then(response => {
        dispatch({
          type: C.GET_CUSTOMERS_TO_APPROVE,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_CUSTOMERS_TO_APPROVE,
          payload: err,
        });
        ERROR_MODAL('Error al traer la lista de clientes', err.data);
      });
  }
};

export const getDateListToCustomer = (companyId) => {
  return dispatch => {
    return adminServices.getDateListToCustomer(companyId)
      .then(response => {
        dispatch({
          type: C.GET_DATELIST_TO_CUSTOMER,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_DATELIST_TO_CUSTOMER,
          payload: err,
        });
        ERROR_MODAL('Error al traer las fechas de la empresa de clientes', err.data);
      });
  }
};



export const approveCustomers = (client, approve, cycleId) => {

  console.log("Actions", cycleId);

  return dispatch => {
    return adminServices.approveCustomer(client, approve, cycleId)
      .then(response => {
        dispatch(getAllCustomersToApprove());
        dispatch({
          type: C.APPROVE_CUSTOMERS,
          payload: response.data
        });
        SUCCESS_MODAL("Acción realizada satisfactoriamente", response.data);
      }).catch(err => {
        dispatch({
          type: C.APPROVE_CUSTOMERS,
          payload: err,
        });
        ERROR_MODAL('Error al modificar el estado del cliente', err.data);
      });
  }
};