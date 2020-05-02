import { UserActionTypes } from '../../redux/user/user.actions'

const INITIAL_STATE = {
    currentUser: "" // set to null
}

const userReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
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
