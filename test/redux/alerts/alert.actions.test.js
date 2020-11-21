import {alertActions} from "../../../src/redux/alerts/alert.actions";
import AlertTypes from "../../../src/redux/alerts/alert.types";
import thunk from 'redux-thunk'
import configureStore from "redux-mock-store";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('alert actions', () => {
    it('should create the success alert action', () => {
        const message = 'mockmessage'

        const expectedActions = [
            { type: AlertTypes.SUCCESS, payload: message },
            { type: AlertTypes.CLEAR }
        ]

        const store = mockStore({ alert: {} })
        return store.dispatch(alertActions.success(message)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('should create the error alert action', () => {
        const message = 'mockmessage'
        const expectedActions = [
            { type: AlertTypes.ERROR, payload: message },
            { type: AlertTypes.CLEAR }
        ]

        const store = mockStore({ alert: {} })
        return store.dispatch( alertActions.error(message)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('should create the error alert action', () => {
        expect(alertActions.clear().type).toEqual(AlertTypes.CLEAR);
    });

});