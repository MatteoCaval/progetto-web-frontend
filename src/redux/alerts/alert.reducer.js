import AlertTypes from "./alert.types";

const alertReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case AlertTypes.SUCCESS:
            return {
                type: AlertTypes.SUCCESS,
                message: action.payload
            }
        case AlertTypes.ERROR:
            return {
                type: AlertTypes.ERROR,
                message: action.payload
            }
        case AlertTypes.CLEAR:
            console.log('clear')
            return {}
        default:
            return state

    }
}

export default alertReducer