import AlertTypes from "./alert.types";

const success = (message) => {
    return {
        type: AlertTypes.SUCCESS,
        payload: message
    }
}

const error = (message) => {
    return {
        type: AlertTypes.ERROR,
        payload: message
    }
}

const clear = () => {
    return {
        type: AlertTypes.CLEAR
    }
}

export const alertActions = {
    success,
    error,
    clear
}