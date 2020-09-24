
///Types
import {adminTypes as C} from '../../types';

const initialState={
  registerAdminResponse: null,
  requestResponse: null,
  requestOutLayResponse: null,
  createCustomerResponse: null,
  companyResponse: null,
  companySalaryResponse: [],  
  companyList: null,
  customerList: null,
  customerListToApprove: null, 
  customerDateList: null,
  rejectedRequest: null,
  pendingRHRequest: null,
  generateReportData: null,
  countCustomerData: null,
  bankRefundedResponse: null,
  withoutChangesResponse: null,
  withDocumentsResponse: null,
  processWithoutChangeReponse: null,
};


export default function adminReducer(state = initialState, action){
  switch (action.type) {
    case C.RESET_VALUES:
      return{
      ...state,
        companyResponse: null,
        generateReportData: null,
      };
    case C.REGISTER_ADMIN:
      return{
        ...state,
        registerAdminResponse: action.payload,
      };
    case C.GET_REQUEST_TO_APPROVE:
      return{
        ...state,
        requestResponse: action.payload
      };
    case C.CREATE_COMPANY:
      return{
        ...state,
        companyResponse: action.correct
      };
    case C.CREATE_CUSTOMER:
      return{
        ...state,
        createCustomerResponse: action.correct
      }
    case C.GET_ALL_COMPANIES:
      return{
        ...state,
        companyList: action.payload
      };
    case C.GET_COMPANY_WITH_SALARY:
      return{
        ...state,
        companySalaryResponse: action.payload
      }
    case C.GET_ALL_CUSTOMERS:
      return{
        ...state,
        customerList: action.payload
      };      
    case C.GET_CUSTOMERS_TO_APPROVE:
      return{
        ...state,
        customerListToApprove: action.payload
      };
    case C.GET_REJECTED_REQUEST:
      return{
        ...state,
        rejectedRequest: action.payload
      };
    case C.GET_PENDINGRH_REQUEST:
      return{
        ...state,
        pendingRHRequest: action.payload
      };
    case C.GET_DATELIST_TO_CUSTOMER:
      return{
        ...state,
        customerDateList: action.payload
      }  
    case C.GET_REQUEST_TO_OUTLAY:
      return{
        ...state,
        requestOutLayResponse: action.payload
      };
    case C.GET_REQUEST_BANK_REFUNDED:
      return{
        ...state,
        bankRefundedResponse: action.payload
      };
    case C.GET_REQUEST_PROCESS_WITHOUT_CHANGE:
      return{
        ...state,
        processWithoutChangeReponse: action.payload
      };
    case C.GENERATE_BANK_REPORT:
      return{
        ...state,
        generateReportData: action.payload
      }
    case C.GET_CUSTOMERS_COUNT_TO_APPROVE:
      return{
        ...state,
        countCustomerData: action.payload
      }      
    case C.PASS_WITHOUT_CHANGES_REQUEST:
      return{
        ...state,
        withoutChangesResponse: action.payload
      }
    case C.PASS_WITH_DOCUMENTS_REQUEST:
      return{
        ...state,
        withDocumentsResponse: action.payload
      }
    default:
      return state;
  }
}