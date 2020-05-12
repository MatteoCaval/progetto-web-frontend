import axios from 'axios'
import AuthActionType from "../auth/auth.actionType";

export const UserActionTypes = {
    SET_USER: 'SET_USER'
}

export const setCurrentUser = (name) => {
    return {
        type: UserActionTypes.SET_USER,
        payload: {
            name: name
        }
    }
}

export const loginSuccess = user => {
    return {
        type: AuthActionType.LOGIN_SUCCESS,
        payload: user
    }
}

export const loginFailed = errorMessage => {
    return {
        type: AuthActionType.LOGIN_FAILED,
        payload: errorMessage
    }
}


// TODO create auth package and move inside it
export const loginUser = (email, password) => {
    return dispatch => {
        axios.post('http://localhost:3001/user/login', { email, password })
            .then(result => {
                dispatch(loginSuccess(result.data))
            })
            .catch(error => dispatch(loginFailed(error)))

    }
}