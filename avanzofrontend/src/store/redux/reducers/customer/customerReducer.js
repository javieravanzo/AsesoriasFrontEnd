///Types
import {customerTypes as C} from '../../types';

const initialState={
  idDocumentsTypes: [],
  registerDataResponse: {},
  registerResponse: null,
  homeDataResponse: {},
  requestDataResponse: {},
  outlayDataResponse: {},
  outlayDatesList: {},
  documentsReponse: {},
  transactionList: [],
  requestList: {},
  outlayedRequestList: {},
  rejectedRequestList: {},
  accountDetail: null,
  requestResponse: null,
  generateCodesResponse: null,
};

export default function customerReducer(state = initialState, action){
  switch (action.type) {
    case C.GET_DOCUMENTS_TYPE:
      return{
        ...state,
        idDocumentsTypes: action.payload,
      };
    case C.REGISTER:
      return{
        ...state,
        registerDataResponse: action.payload,
        registerResponse: action.correct,
      };
    case C.GET_HOME_DATA:
      return{
        ...state,
        homeDataResponse: action.payload,
      };
    case C.GET_REQUEST_DATA:
      return{
        ...state,
        requestDataResponse: action.payload,
      };
    case C.GET_OUTLAY_DATA:
      return{
        ...state,
        outlayDataResponse: action.payload,
      };
    case C.GET_OUTLAY_DATESLIST:
      return{
        ...state,
        outlayDatesList: action.payload,
      };
    case C.GENERATE_DOCUMENTS:
      return{
        ...state,
        documentsReponse: action.payload,
      };
    case C.GET_TRANSACTIONS_LIST:
      return{
        ...state,
        transactionList: action.payload,
      };
    case C.GET_REQUEST_LIST:
      return{
        ...state,
        requestList: action.payload,
      };
    case C.GET_OUTLAYED_REQUEST_LIST:
      return{
        ...state,
        outlayedRequestList: action.payload,
      };
    case C.GET_REJECTED_REQUEST_LIST:
      return{
        ...state,
        rejectedRequestList: action.payload,
      };
    case C.CREATE_REQUEST:
      return{
        ...state,
        requestResponse: action.correct
      }
    case C.GET_ACCOUNT_DETAIL:
      return{
        ...state,
        accountDetail: action.payload
      }
    case C.GENERATE_CODES:
      return{
        ...state,
        generateCodesResponse: action.code
      }
    case C.RESET_VALUES:
      return{
        ...state,
        requestResponse: null
      }
    default:
      return state;
  }
}