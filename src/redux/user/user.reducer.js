import AuthActionType from "../auth/auth.actionType";
import UserActionTypes from "./user.actionTypes";

export const INITIAL_STATE = {
    data: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case AuthActionType.LOGIN_SUCCESS:
            return {
                data: action.payload
            }
        case UserActionTypes.FETCH_CURRENT_USER_SUCCESS: {
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                }
            }
        }
        case UserActionTypes.FETCH_CURRENT_USER_FAILED: {
            if (action.payload.code) {
                return INITIAL_STATE
            } else {
                return state
            }
        }
        case AuthActionType.LOGOUT_SUCCESS:
            return INITIAL_STATE

        case AuthActionType.LOGIN_FAILED:
        case AuthActionType.LOGOUT_FAILED:
        case AuthActionType.REGISTRATION_FAILED: {
            return {
                ...state,
                error: action.payload
            }
        }

        default:
            return state;
    }
}

export default userReducer
