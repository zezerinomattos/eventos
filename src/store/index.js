import { legacy_createStore } from 'redux';
import usuarioReducer from './usuarioReducer';

const store = legacy_createStore(usuarioReducer);

export default store;