import AuthActionType from "../auth/auth.actionType";
import { alertActions } from "../alerts/alert.actions";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";
import UserActionTypes from "./user.actionTypes";

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

export const loginUser = (email, password) => {
    return dispatch => {
        authService.loginUser(email, password)
            .then(result => {
                dispatch(loginSuccess(result.data))
            })
            .catch(error => {
                    dispatch(loginFailed(error.message))
                    dispatch(alertActions.error(error.message))
                }
            )

    }
}

export const registerUser = (user) => {
    return dispatch => {
        authService.registerUser(user)
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
        authService.logout(token)
            .then(result => {
                dispatch(logoutSuccess())
            })
            .catch(error => dispatch(logoutFailed(error)))

    }
}

export const logoutSuccess = () => {
    return {
        type: AuthActionType.LOGOUT_SUCCESS
    }
}
export const logoutFailed = (error) => {
    return {
        type: AuthActionType.LOGOUT_FAILED,
        payload: error
    }
}

export const fetchCurrentUser = () => {
    return (dispatch, getState) => {
        const token = getState().user.token
        userService.fetchCurrentUser(token)
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








