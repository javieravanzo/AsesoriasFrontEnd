//Importar de Node-Modules
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//Importar combinador de reducers.
import reducer from './redux/reducers/index';

const initialState = {}

const middleware = [thunk];

const store = createStore(
  reducer, initialState,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) 
);

export default store;