import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from "redux-logger/src";
import rootReducer from "./rootreducer";
import { persistStore, persistReducer } from "redux-persist";
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const logger = createLogger()

const middlewares = [thunk, logger]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

export const store = createStore(persistReducer(persistConfig, rootReducer), composeEnhancers(applyMiddleware(...middlewares)))
export const persistor = persistStore(store)

export default { store, persistor }