import axios from 'axios'
import AuthActionType from "../auth/auth.actionType";
import Config from '../../config'

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

export const registrationSuccess = user => {
    return {
        type: AuthActionType.REGISTRATION_SUCCESS,
        payload: user
    }
}

export const registrationFailed = errorMessage => {
    return {
        type: AuthActionType.REGISTRATION_FAILED,
        payload: errorMessage
    }
}


// TODO create auth package and move inside it
export const loginUser = (email, password) => {
    return dispatch => {
        axios.post(`${Config.API_BASE_URL}/auth/signin`, { email, password })
            .then(result => {
                dispatch(loginSuccess(result.data))
            })
            .catch(error => dispatch(loginFailed(error)))

    }
}

export const registerUser = (user) => {
    return dispatch => {
        axios.post(`${Config.API_BASE_URL}/auth/signup`, user)
            .then(result => {
                dispatch(registrationSuccess(result.data))
            })
            .catch(error => dispatch(registrationFailed(error)))
    }
}