import AuthActionType from "../auth/auth.actionType";

const INITIAL_STATE = null

const userReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case AuthActionType.LOGIN_SUCCESS:
            return {
                ...action.payload
            }
        // case UserActionTypes.SET_USER:
        //     return {
        //         ...state,
        //         currentUser: action.payload.name
        //     }
        case AuthActionType.LOGOUT_SUCCESS:
            return null
        default:
            return state;
    }
}

export default userReducer
