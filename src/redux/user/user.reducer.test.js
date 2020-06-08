import userReducer from "./user.reducer";
import AuthActionType from "../auth/auth.actionType";
import UserActionTypes from "./user.actionTypes";

describe('user reducer', () => {
    it('should save user data on LOGIN_SUCCESS', () => {
        const user = { email: 'prova@test.it', token: 'token' }
        expect(userReducer(null, {
            type: AuthActionType.LOGIN_SUCCESS,
            payload: user
        })).toEqual(
            user
        )
    })

    it('should save user data on FETCH_CURRENT_USER_SUCCESS', () => {
        const user = { email: 'prova@test.it', token: 'token' }
        expect(userReducer(null, {
            type: UserActionTypes.FETCH_CURRENT_USER_SUCCESS,
            payload: user
        })).toEqual(
            user
        )
    })

    it('should reset user data on FETCH_CURRENT_USER_FAILED', () => {
        expect(userReducer({ email: 'prova@test.it', token: 'token' },
            { type: UserActionTypes.FETCH_CURRENT_USER_FAILED }))
            .toEqual(null)
    })

    it('should reset user data on LOGOUT_SUCCESS', () => {
        expect(userReducer({ email: 'prova@test.it', token: 'token' },
            { type: AuthActionType.LOGOUT_SUCCESS }))
            .toEqual(null)
    })

})