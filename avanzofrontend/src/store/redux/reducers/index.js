//Dependencias
import { combineReducers } from 'redux'; //Combinar todos

import loginReducer from "./login/loginReducer";
import customerReducer from './customer/customerReducer';

export default combineReducers({
  login: loginReducer,
  customer: customerReducer,
});