
///Types
import {adminTypes as C} from '../../types';

const initialState={
  registerAdminResponse: null,
  requestResponse: []
};

export default function adminReducer(state = initialState, action){
  switch (action.type) {
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
    default:
      return state;
  }
}