import userReducer from "../../../src/redux/user/user.reducer";
import AuthActionType from "../../../src/redux/auth/auth.actionType";
import UserActionTypes from "../../../src/redux/user/user.actionTypes";

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

    it('should reset user data on FETCH_CURRENT_USER_FAILED due to an error response', () => {
        const user = { email: 'prova@test.it', token: 'token' }
        expect(userReducer(user,
            {
                type: UserActionTypes.FETCH_CURRENT_USER_FAILED,
                payload: {
                    code: 404
                }
            }))
            .toEqual(null)
    })

    it('should not reset user data on FETCH_CURRENT_USER_FAILED if there is no response from the server', () => {
        const user = { email: 'prova@test.it', token: 'token' }
        expect(userReducer(user,
            {
                type: UserActionTypes.FETCH_CURRENT_USER_FAILED,
                payload: {
                    code: null
                }
            }))
            .toEqual(user)
    })


    it('should reset user data on LOGOUT_SUCCESS', () => {
        expect(userReducer({ email: 'prova@test.it', token: 'token' },
            { type: AuthActionType.LOGOUT_SUCCESS }))
            .toEqual(null)
    })

})