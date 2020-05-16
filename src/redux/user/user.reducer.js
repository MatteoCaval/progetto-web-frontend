import UserActionTypes from "./user.actionTypes";
import AuthActionType from "../auth/auth.actionType";

const INITIAL_STATE = {
    currentUser: null,
    orders: null
}

const userReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case AuthActionType.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        // case UserActionTypes.SET_USER:
        //     return {
        //         ...state,
        //         currentUser: action.payload.name
        //     }
        case AuthActionType.LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case UserActionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state;
    }
}

export default userReducer
