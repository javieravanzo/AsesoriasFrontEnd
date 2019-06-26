import {LOGIN_SUCCESS, LOGIN_ERROR, LOGGING, RESET_ALL, LOGOUT} from '../../types'

const initialState={
  isLogin: false,
  role: setRole(localStorage.getItem("role"))
};

function setRole(current){
  let role = current=== undefined ? "" : current;
  return role === "Admin" || role === "Geek" ? 2 : role === "Operator" ? 1 : 0;
}

export default function increaseReducer(state = initialState, action){
  switch (action.type) {
    case RESET_ALL:
      return{
        ...state,
        isLogin: action.isLogin,
        role: ""
      };
    case LOGIN_SUCCESS:
      return{
        ...state,
        isLogin: true,
      };
    case LOGIN_ERROR:
      return{
        ...state,
        isLogin: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: action.isLogin
      };
    case LOGGING:
      return{
        ...state,
        isLogin: action.isLogin
      };
    default:
      return state;
  }
}