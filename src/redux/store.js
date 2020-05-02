import {applyMiddleware, createStore, compose} from 'redux'
import {createLogger} from "redux-logger/src";
import rootReducer from "./rootreducer";

const logger = createLogger()

const middlewares = [logger]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))