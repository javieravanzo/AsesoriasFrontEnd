///Types
import {generalTypes as C} from '../../types';

//Services
import generalServices from '../../../../services/general/generalServices';

//Subcomponents
import { ERROR_MODAL, SUCCESS_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

//Actions
import {getAllRequestToOutLay, getAllRequestToApprove} from '../admin/adminActions';

export const approveorRejectRequest = (data, userId) => {
  return dispatch => {
    return generalServices.approveorRejectRequest(data)
      .then(response => {
        dispatch(getAllRequestToOutLay(userId));
        dispatch(getAllRequestToApprove());
        dispatch({
          type: C.APPROVE_REJECT_REQUEST,
          payload: response.data
        });
        SUCCESS_MODAL("Acción realizada exitosamente", response.data.message)
      }).catch(err => {
        dispatch({
          type: C.APPROVE_REJECT_REQUEST,
          payload: err,
        });
        ERROR_MODAL('Error al aprobar o rechazar la solicitud', err.data.message);
      });
  }
};

export const approveorRejectRequestByCompany = (data, userId) => {
  return dispatch => {
    return generalServices.approveorRejectRequest(data)
      .then(response => {
        dispatch(getAllRequestToApprove());
        dispatch({
          type: C.APPROVE_REJECT_REQUEST,
          payload: response.data
        });
        SUCCESS_MODAL("Acción realizada exitosamente", "La solicitud ha sido aprobada exitosamente.")
      }).catch(err => {
        dispatch({
          type: C.APPROVE_REJECT_REQUEST,
          payload: err,
        });
        ERROR_MODAL('Error al aprobar o rechazar la solicitud', err.data.message);
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
