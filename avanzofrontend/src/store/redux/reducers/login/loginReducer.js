///Types
import {loginTypes as C} from '../../types';
import {customerTypes as Cu} from '../../types';

const initialState={
  isLogin: false,
  forgetPasswordResponse: null,
  resetPasswordResponse: null,
  correct: false,
  newRegisterResponse: null,
  companyList: [],
};

export default function loginReducer(state = initialState, action){
  switch (action.type) {
    case C.RESET_ALL:
      return{
        ...state,
        isLogin: action.isLogin,
      };
    case C.LOGOUT:
      return {
        ...state,
        isLogin: action.isLogin
      };
    case C.LOGGING:
      //console.log("ACTIONPAYLOAD", action.payload);
      return{
        ...state,
        isLogin: action.payload
      };
    case C.RESET_PASSWORD:
      return{
        ...state,
        forgetPasswordResponse: action.payload
      };
    case C.CONFIRM_PASSWORD:
      return{
        ...state,
        resetPasswordResponse: action.payload,
        correct: action.correct
      };
    case Cu.NEW_REGISTER:
      return{
        ...state,
        newRegisterResponse: action.payload
      };
    case Cu.GET_COMPANIES:
      return{
        ...state,
        companyList: action.payload
      };
    default:
      return state;
  }
}