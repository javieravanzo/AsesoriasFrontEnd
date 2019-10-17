///Types
import {customerTypes as C} from '../../types';

const initialState={
  idDocumentsTypes: [],
  registerResponse: {},
  homeDataResponse: {},
  requestDataResponse: {},
  outlayDataResponse: {},
  outlayDatesList: [],
  documentsReponse: {},
  transactionList: [],
  requestList: [],
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
        registerResponse: action.payload,
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
    default:
      return state;
  }
}