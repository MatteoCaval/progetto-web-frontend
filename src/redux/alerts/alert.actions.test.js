import { alertActions } from "./alert.actions";
import AlertTypes from "./alert.types";


describe('alert actions', () => {
    it('should create the success alert action', () => {
        const message = 'mockmessage'

        const action = alertActions.success(message)

        expect(action.type).toEqual(AlertTypes.SUCCESS);
        expect(action.payload).toEqual(message);
    });

    it('should create the error alert action', () => {
        const message = 'mockmessage'

        const action = alertActions.error(message)

        expect(action.type).toEqual(AlertTypes.ERROR);
        expect(action.payload).toEqual(message);
    });

    it('should create the error alert action', () => {
        expect(alertActions.clear().type).toEqual(AlertTypes.CLEAR);
    });

});