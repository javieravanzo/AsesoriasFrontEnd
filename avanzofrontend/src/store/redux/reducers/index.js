//Dependencias
import { combineReducers } from 'redux'; //Combinar todos

import loginReducer from "./login/loginReducer";

export default combineReducers({
  login: loginReducer,
});