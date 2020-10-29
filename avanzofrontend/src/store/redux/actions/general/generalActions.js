///Types
import {generalTypes as C} from '../../types';
import {adminTypes as A} from '../../types';

//Services
import generalServices from '../../../../services/general/generalServices';

//Subcomponents
import { ERROR_MODAL, SUCCESS_MODAL } from '../../../../ui/components/subcomponents/modalMessages';

//Actions
import {getAllRequestToOutLay, getAllRequestToApprove, getAllRejectedRequest,
        getAllPendingRHRequest, getAllBankRefunded, getAllProcessWithoutChange,
        getAllDefinitelyRejected, getAllProcessDocumentsChange, resetValue } from '../admin/adminActions';

import {getAllRequest} from '../company/companyActions';

export const approveorRejectRequest = (data, userId) => {
  return dispatch => {
    return generalServices.approveorRejectRequest(data)
      .then(response => {
        dispatch(getAllRequestToApprove());
        dispatch(getAllPendingRHRequest());
        dispatch(getAllRejectedRequest());
        dispatch(getAllBankRefunded());
        dispatch(getAllProcessWithoutChange());
        dispatch(getAllDefinitelyRejected());
        dispatch(getAllProcessDocumentsChange());
        dispatch({
          type: C.APPROVE_REJECT_REQUEST,
          payload: response.data, 
          code: true
        });
        dispatch(resetValue());
        SUCCESS_MODAL("Acción realizada exitosamente", response.data.message)
      }).catch(err => {
        dispatch({
          type: C.APPROVE_REJECT_REQUEST,
          payload: err,
          code: true
        });
        ERROR_MODAL('Error al aprobar o rechazar la solicitud', err.data.message);
      });
  }
};

export const passToProcessWithoutChange = (requestid) => {
  return dispatch => {
    return generalServices.passToProcessWithoutChange(requestid)
      .then(response => {
        dispatch(getAllRequestToApprove());
        dispatch(getAllPendingRHRequest());
        dispatch(getAllRejectedRequest());
        dispatch(getAllProcessWithoutChange());
        dispatch({
          type: A.PASS_WITHOUT_CHANGES_REQUEST,
          payload: response.data
        });
        SUCCESS_MODAL("Acción realizada exitosamente", response.data.message)
      }).catch(err => {
        dispatch({
          type: A.PASS_WITHOUT_CHANGES_REQUEST,
          payload: err,
        });
        ERROR_MODAL('Error al cambiar el estado de la solicitud', err.data.message);
      });
  }
};

export const passToProcessWithDocuments = (requestid) => {
  return dispatch => {
    return generalServices.passToProcessWithDocuments(requestid)
      .then(response => {
        dispatch(getAllRequestToApprove());
        dispatch(getAllPendingRHRequest());
        dispatch(getAllRejectedRequest());
        dispatch(getAllProcessDocumentsChange());
        dispatch({
          type: A.PASS_WITH_DOCUMENTS_REQUEST,
          payload: response.data
        });
        SUCCESS_MODAL("Acción realizada exitosamente", response.data.message)
      }).catch(err => {
        dispatch({
          type: A.PASS_WITH_DOCUMENTS_REQUEST,
          payload: err,
        });
        ERROR_MODAL('Error al cambiar el estado de la solicitud', err.data.message);
      });
  }
};

export const changeRequestToOutllay = (requestid) => {
  return dispatch => {
    return generalServices.passToOutlay(requestid)
      .then(response => {
        dispatch(getAllRequestToApprove());
        dispatch(getAllPendingRHRequest());
        dispatch(getAllRejectedRequest());
        dispatch(getAllRequestToOutLay());
        
        dispatch({
          type: A.PASS_TO_OUTLAY,
          payload: response.data
        });
        SUCCESS_MODAL("Acción realizada exitosamente", response.data.message)
      }).catch(err => {
        dispatch({
          type: A.PASS_TO_OUTLAY,
          payload: err,
        });
        ERROR_MODAL('Error al cambiar el estado de la solicitud', err.data.message);
      });
  }
};

export const approveorRejectRequestByCompany = (data, userId) => {
  return dispatch => {
    return generalServices.approveorRejectRequest(data)
      .then(response => {
        dispatch(getAllRequest());
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
