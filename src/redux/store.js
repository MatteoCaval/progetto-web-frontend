import {applyMiddleware, createStore, compose} from 'redux'
import {createLogger} from "redux-logger/src";
import rootReducer from "./rootreducer";
import thunk from 'redux-thunk';

const logger = createLogger()

const middlewares = [thunk, logger]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))