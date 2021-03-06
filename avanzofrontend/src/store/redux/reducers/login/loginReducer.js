///Types
import {loginTypes as C} from '../../types';
import {customerTypes as Cu} from '../../types';

const initialState={
  isLogin: false,
  forgetPasswordResponse: null,
  resetPasswordResponse: null,
  correct: false,
  newRegisterResponse: null,
  registerInfo: {},
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
        registerInfo: action.payload
      };
    default:
      return state;
  }
}