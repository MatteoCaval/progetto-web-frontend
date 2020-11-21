import AlertTypes from "./alert.types";

const success = (message) => {
    return dispatch => {
        dispatch({
            type: AlertTypes.SUCCESS,
            payload: message
        })

        return new Promise(resolve => {
            setTimeout(resolve, 2000)
        })
            .then(() => {
                dispatch(clear())
            })


    }
}

const error = (message) => {
    return dispatch => {
        dispatch({
            type: AlertTypes.ERROR,
            payload: message
        })

        return new Promise(resolve => {
            setTimeout(resolve, 2000)
        })
            .then(() => {
                dispatch(clear())
            })
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