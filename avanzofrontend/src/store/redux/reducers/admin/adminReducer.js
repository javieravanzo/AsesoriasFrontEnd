
///Types
import {adminTypes as C} from '../../types';
import {generalTypes as G} from '../../types';

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
  definitelyRejected: null,
  pendingRHRequest: null,
  generateReportData: null,
  pendingToFinalizeByBank: null,
  countCustomerData: null,
  bankRefundedResponse: null,
  withoutChangesResponse: null,
  withDocumentsResponse: null,
  processWithoutChangeReponse: null,
  receiveBankFileCode: null,
  processDocumentsChangeReponse: null,
  processInBank: null,
  finalizedRequest: null,
  generateGeneralByRRHH: null,
  generateParticularByRRHH: null,
  loadScoringFile: null,
  approveRejectedResponse: null,
};

export default function adminReducer(state = initialState, action){
  switch (action.type) {
    case C.RESET_VALUES:
      return{
      ...state,
        companyResponse: null,
        generateReportData: null,
        pendingToFinalizeByBank: null,
        generateParticularByRRHH: null,
        generateGeneralByRRHH: null,
        loadScoringFile: null,
        approveRejectedResponse: null
        
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
    case G.APPROVE_REJECT_REQUEST:
      return{
        ...state,
        approveRejectedResponse: action.code
      };
    case C.GET_REJECTED_REQUEST:
      return{
        ...state,
        rejectedRequest: action.payload
      };
    case C.GET_DEFINITELY_REJECTED_REQUEST:
      return{
        ...state,
        definitelyRejected: action.payload
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
    case C.GET_REQUEST_PROCESS_DOCUMENTS_CHANGE:
      return{
        ...state,
        processDocumentsChangeReponse: action.payload
      };  
    case C.GENERATE_BANK_REPORT:
      return{
        ...state,
        generateReportData: action.payload
      };
    case C.GENERATE_PENDING_BY_BANK_REPORT:
      return{
        ...state,
        pendingToFinalizeByBank: action.payload
      };
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
    case C.GET_REQUEST_PROCESS_INBANK:
      return{
        ...state,
        processInBank: action.payload
      }
    case C.RECEIVE_BANK_FILE: 
      return{
        ...state,
        receiveBankFileCode: action.payload
      }
    case C.GENERATE_GENERAL_BY_RRHH: 
      return{
        ...state,
        generateGeneralByRRHH: action.payload
      }
    case C.GENERATE_PARTICULAR_BY_RRHH: 
      return{
        ...state,
        generateParticularByRRHH: action.payload
      }
    case C.GET_FINALIZED_REQUEST:
      return{
        ...state,
        finalizedRequest: action.payload
      }
    case C.LOAD_REPORT_BY_COMPANY:
      return{
        ...state,
        loadScoringFile: action.code
      }    
    default:
      return state;
  }
}