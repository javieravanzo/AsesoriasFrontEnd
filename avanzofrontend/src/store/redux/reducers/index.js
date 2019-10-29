//Dependencias
import { combineReducers } from 'redux'; //Combinar todos

//Reducers
import loginReducer from "./login/loginReducer";
import customerReducer from './customer/customerReducer';
import companyReducer from "./company/companyReducer";
import adminReducer from "./admin/adminReducer";
import integrationReducer from "./integration/integrationReducer";

export default combineReducers({
  login: loginReducer,
  customer: customerReducer,
  company: companyReducer,
  admin: adminReducer,
  integration: integrationReducer,
});