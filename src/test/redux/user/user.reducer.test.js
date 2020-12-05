import userReducer, {INITIAL_STATE} from "../../../redux/user/user.reducer";
import AuthActionType from "../../../redux/auth/auth.actionType";
import UserActionTypes from "../../../redux/user/user.actionTypes";

describe('user reducer', () => {

    it('should save user data on LOGIN_SUCCESS', () => {
        const user = { email: 'prova@test.it', token: 'token' }
        expect(userReducer({ data: user, error: null }, {
            type: AuthActionType.LOGIN_SUCCESS,
            payload: user
        })).toHaveProperty('data', user)
    })

    it('should save user data on FETCH_CURRENT_USER_SUCCESS', () => {
        const user = { email: 'prova@test.it', token: 'token' }
        expect(userReducer(INITIAL_STATE, {
            type: UserActionTypes.FETCH_CURRENT_USER_SUCCESS,
            payload: user
        })).toHaveProperty('data', user)
    })

    it('should reset user data on FETCH_CURRENT_USER_FAILED due to an error response', () => {
        const user = { email: 'prova@test.it', token: 'token' }
        expect(userReducer({ data: user, error: null },
            {
                type: UserActionTypes.FETCH_CURRENT_USER_FAILED,
                payload: {
                    code: 404
                }
            }))
            .toEqual({ data: null, error: null })
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
        expect(userReducer({ data: { email: 'prova@test.it', token: 'token' }, error: null },
            { type: AuthActionType.LOGOUT_SUCCESS }))
            .toEqual({ data: null, error: null })
    })

})