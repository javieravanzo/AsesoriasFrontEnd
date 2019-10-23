//Dependencias
import { combineReducers } from 'redux'; //Combinar todos

//Reducers
import loginReducer from "./login/loginReducer";
import customerReducer from './customer/customerReducer';
import companyReducer from "./company/companyReducer";
import adminReducer from "./admin/adminReducer";

export default combineReducers({
  loginReducer: loginReducer,
  customer: customerReducer,
  company: companyReducer,
  admin: adminReducer,
});