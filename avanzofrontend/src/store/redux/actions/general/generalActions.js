///Types
import {generalTypes as C} from '../../types';

//Services
import generalServices from '../../../../services/general/generalServices';

//Subcomponents
import { ERROR_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

export const approveorRejectRequest = (data) => {
  return dispatch => {
    return generalServices.approveorRejectRequest(data)
      .then(response => {
        dispatch({
          type: C.APPROVE_REJECT_REQUEST,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.APPROVE_REJECT_REQUEST,
          payload: err,
        });
        ERROR_MODAL('Error al aprobar o rechazar la solicitud', err.data);
      });
  }
};

export const getAllCustomer = (companyId) => {
  return dispatch => {
    return generalServices.getAllCustomer(companyId)
      .then(response => {
        dispatch({
          type: C.GET_CUSTOMER_LIST,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_CUSTOMER_LIST,
          payload: err,
        });
        ERROR_MODAL('Error al traer la lista de clientes', err);
      });
  }
};

export const getReportByCustomer = (customerId) => {
  return dispatch => {
    return generalServices.getReportByCustomer(customerId)
      .then(response => {
        dispatch({
          type: C.GET_CUSTOMER_REPORT,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_CUSTOMER_REPORT,
          payload: err,
        });
        ERROR_MODAL('Error al traer el reporte del cliente', err);
      });
  }
};

export const getReportByCompany = (companyId) => {
  return dispatch => {
    return generalServices.getReportByCompany(companyId)
      .then(response => {
        dispatch({
          type: C.GET_COMPANY_REPORT,
          payload: response.data
        });
      }).catch(err => {
        dispatch({
          type: C.GET_COMPANY_REPORT,
          payload: err,
        });
        ERROR_MODAL('Error al traer el reporte de la empresa', err);
      });
  }
};
