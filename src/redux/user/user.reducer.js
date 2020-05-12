import { UserActionTypes } from '../../redux/user/user.actions'
import AuthActionType from "../auth/auth.actionType";

const INITIAL_STATE = {
    currentUser: "" // set to null
}

const userReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case AuthActionType.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.email
            }
        case UserActionTypes.SET_USER:
            return {
                ...state,
                currentUser: action.payload.name
            }
        default:
            return state;
    }
}

export default userReducer
