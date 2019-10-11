
///Types
import {adminTypes as C} from '../../types';

const initialState={
  registerAdminResponse: null,
};

export default function adminReducer(state = initialState, action){
  switch (action.type) {
    case C.REGISTER_ADMIN:
      
      return{
        ...state,
        registerAdminResponse: action.payload,
      };
    /*case C.REGISTER:
      return{
        ...state,
        registerResponse: action.payload,
      };*/
    default:
      return state;
  }
}