import AuthActionType from "../auth/auth.actionType";
import {alertActions} from "../alerts/alert.actions";
import {authService} from "../../services/auth.service";
import {userService} from "../../services/user.service";
import UserActionTypes from "./user.actionTypes";
import {mapNetworkError} from "../networkUtils"

const loginSuccess = user => {
    return {
        type: AuthActionType.LOGIN_SUCCESS,
        payload: user
    }
}

const loginFailed = error => {
    return {
        type: AuthActionType.LOGIN_FAILED,
        payload: error
    }
}

const registrationSuccess = user => {
    return {
        type: AuthActionType.REGISTRATION_SUCCESS,
        payload: user
    }
}

const registrationFailed = error => {
    return {
        type: AuthActionType.REGISTRATION_FAILED,
        payload: error
    }
}

export const loginUser = (email, password) => {
    return dispatch => {
        return authService.loginUser(email, password)
            .then(result => {
                dispatch(loginSuccess(result.data))
            })
            .catch(error => {
                    dispatch(loginFailed(mapNetworkError(error)))
                    dispatch(alertActions.error(mapNetworkError(error).description))
                }
            )

    }
}

export const registerUser = (user) => {
    return dispatch => {
        return authService.registerUser(user)
            .then(result => {
                dispatch(registrationSuccess(result.data))
                dispatch(alertActions.success('Registration Successful'))
                fetchCurrentUserByToken(dispatch, result.data.token)
            })
            .catch(error => {
                dispatch(registrationFailed(mapNetworkError(error)))
                dispatch(alertActions.error(mapNetworkError(error).description))
            })
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        const token = getState().user.data.token
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
        const token = getState().user.data.token
        return fetchCurrentUserByToken(dispatch, token)
    }
}

const fetchCurrentUserByToken = (dispatch, token) => {
    return userService.fetchCurrentUser(token)
        .then(result => {
            dispatch(fetchCurrentUserSuccess(result.data))
        })
        .catch(error => dispatch(fetchCurrentUserFailed(mapNetworkError(error))))
}

const fetchCurrentUserSuccess = (user) => {
    return {
        type: UserActionTypes.FETCH_CURRENT_USER_SUCCESS,
        payload: user
    }
}

const fetchCurrentUserFailed = error => {
    return {
        type: UserActionTypes.FETCH_CURRENT_USER_FAILED,
        payload: error
    }
}








