import { legacy_createStore } from 'redux';
import usuarioReducer from './usuarioReducer';
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "siteeventos",
    storage,
}

const persistedReducer = persistReducer(persistConfig, usuarioReducer);

const store = legacy_createStore(persistedReducer);
const persistor = persistStore(store);

export  { store, persistor };