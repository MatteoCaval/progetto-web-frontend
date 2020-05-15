import { UserActionTypes } from '../../redux/user/user.actions'
import AuthActionType from "../auth/auth.actionType";

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case AuthActionType.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.SET_USER:
            return {
                ...state,
                currentUser: action.payload.name
            }
        case AuthActionType.LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        default:
            return state;
    }
}

export default userReducer
