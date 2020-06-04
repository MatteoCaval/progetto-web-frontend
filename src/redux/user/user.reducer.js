import AuthActionType from "../auth/auth.actionType";
import UserActionTypes from "./user.actionTypes";

const INITIAL_STATE = null

const userReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case AuthActionType.LOGIN_SUCCESS:
            return {
                ...action.payload
            }
        case UserActionTypes.FETCH_CURRENT_USER_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        case UserActionTypes.FETCH_CURRENT_USER_FAILED: {
            return null
        }
        case AuthActionType.LOGOUT_SUCCESS:
            return null
        default:
            return state;
    }
}

export default userReducer
