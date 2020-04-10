
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
};

export default function adminReducer(state = initialState, action){
  switch (action.type) {
    case C.RESET_VALUES:
      return{
      ...state,
        companyResponse: null
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

    default:
      return state;
  }
}