//Types
import {integrationTypes as C} from '../../types';

const initialState={
  integrationRegisterResponse: null,
  integrationToken: null,
};

export default function integrationReducer(state = initialState, action){
  switch (action.type) {
    case C.INTEGRATION_REGISTER:
      return{
        ...state,
        integrationRegisterResponse: action.payload,
        integrationToken: action.token,
      };
    default:
      return state;
  }
}