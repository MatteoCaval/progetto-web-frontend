import alertReducer from "../../../redux/alerts/alert.reducer";
import AlertTypes from "../../../redux/alerts/alert.types";
import { alertActions } from "../../../redux/alerts/alert.actions";

const initialState = {}

describe('alert reducer', () => {

    it('should return initial state', () => {
        expect(alertReducer()).toEqual({})
    })

    it('should set message after alert success action', () => {
        const message = 'mockmessage'

        expect(
            alertReducer(initialState, {
                type: AlertTypes.SUCCESS,
                payload: message
            })
        ).toEqual({
            type: AlertTypes.SUCCESS,
            message: message
        })

    })

    it('should set message after alert error action', () => {
        const message = 'mockmessage'

        expect(
            alertReducer(initialState, {
                type: AlertTypes.ERROR,
                payload: message
            })
        ).toEqual({
            type: AlertTypes.ERROR,
            message: message
        })

    })

    it('should clear state after clear action', () => {
        const randomState = {
            type: AlertTypes.SUCCESS,
            message: 'test'
        }

        expect(
            alertReducer(randomState, alertActions.clear())
        ).toEqual(
            {}
        )
    })

})