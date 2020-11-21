import AuthActionType from "../auth/auth.actionType";
import {alertActions} from "../alerts/alert.actions";
import {authService} from "../../services/auth.service";
import {userService} from "../../services/user.service";
import UserActionTypes from "./user.actionTypes";
import { getErrorResponseDescription } from "../networkUtils"
const loginSuccess = user => {
    return {
        type: AuthActionType.LOGIN_SUCCESS,
        payload: user
    }
}

const loginFailed = errorMessage => {
    return {
        type: AuthActionType.LOGIN_FAILED,
        payload: errorMessage
    }
}

const registrationSuccess = user => {
    return {
        type: AuthActionType.REGISTRATION_SUCCESS,
        payload: user
    }
}

const registrationFailed = errorMessage => {
    return {
        type: AuthActionType.REGISTRATION_FAILED,
        payload: errorMessage
    }
}

export const loginUser = (email, password) => {
    return dispatch => {
        return authService.loginUser(email, password)
            .then(result => {
                dispatch(loginSuccess(result.data))
            })
            .catch(error => {
                    dispatch(loginFailed(getErrorResponseDescription(error)))
                    dispatch(alertActions.error(getErrorResponseDescription(error)))
                }
            )

    }
}

export const registerUser = (user) => {
    return dispatch => {
        return authService.registerUser(user)
            .then(result => {
                dispatch(registrationSuccess(result.data))
                dispatch(alertActions.success('Registration Sucessful'))
            })
            .catch(error => dispatch(registrationFailed(error)))
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        const token = getState().user.token
        return authService.logout(token)
            .then(result => {
                dispatch(logoutSuccess())
            })
            .catch(error => dispatch(logoutFailed(error)))

    }
}

const logoutSuccess = () => {
    return {
        type: AuthActionType.LOGOUT_SUCCESS
    }
}
const logoutFailed = (error) => {
    return {
        type: AuthActionType.LOGOUT_FAILED,
        payload: error
    }
}

export const fetchCurrentUser = () => {
    return (dispatch, getState) => {
        const token = getState().user.token
        return userService.fetchCurrentUser(token)
            .then(result => {
                dispatch(fetchCurrentUserSuccess(result.data))
            })
            .catch(error => dispatch(fetchCurrentUserFailed(error.message)))

    }
}

const fetchCurrentUserSuccess = (user) => {
    return {
        type: UserActionTypes.FETCH_CURRENT_USER_SUCCESS,
        payload: user
    }
}

const fetchCurrentUserFailed = errorMessage => {
    return {
        type: UserActionTypes.FETCH_CURRENT_USER_FAILED,
        payload: errorMessage
    }
}








