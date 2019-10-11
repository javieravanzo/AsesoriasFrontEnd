///Types
import {companyTypes as C} from '../../types';

const initialState={
  requestList: [],
};

export default function companyReducer(state = initialState, action){
  switch (action.type) {    
    case C.GET_REQUEST_LIST:
      return{
        ...state,
        requestList: action.payload,
      };
    default:
      return state;
  }
}