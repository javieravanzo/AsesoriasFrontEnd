
///Types
import {adminTypes as C} from '../../types';

const initialState={
  registerAdminResponse: null,
  requestResponse: [],
  companyResponse: null, 
  companyList: [],
  customerList: []
};

export default function adminReducer(state = initialState, action){
  switch (action.type) {
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
    case C.GET_ALL_COMPANIES:
      return{
        ...state,
        companyList: action.payload
      };
    case C.GET_ALL_CUSTOMERS:
      return{
        ...state,
        customerList: action.payload
      };
      
    default:
      return state;
  }
}