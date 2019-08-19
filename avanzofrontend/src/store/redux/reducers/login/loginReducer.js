///Types
import {loginTypes as C} from '../../types';

const initialState={
  isLogin: false,
  forgetPasswordResponse: null,
  resetPasswordResponse: null,
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
        isLogin: action.isLogin
      };
    case C.RESET_PASSWORD:
      return{
        ...state,
        forgetPasswordResponse: action.payload
      };
    case C.CONFIRM_PASSWORD:
      return{
        ...state,
        resetPasswordResponse: action.payload
      };
    default:
      return state;
  }
}