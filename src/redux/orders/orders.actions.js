import OrderActionTypes from "./orders.types";
import axios from 'axios'
import Config from "../../config";

export const completeOrder = (orderData) => {
    return (dispatch, getState) => {
        dispatch(completeOrderPending())
        const token = getState().user.currentUser.token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        axios.post(`${Config.API_BASE_URL}/orders`, orderData)
            .then(result => {
                dispatch(completeOrderSuccess())
            })
            .catch(error => dispatch(completeOrderFailed(error)))

    }
}

export const completeOrderSuccess = () => {
    return {
        type: OrderActionTypes.COMPLETE_ORDER_SUCCESS
    }
}

export const completeOrderFailed = (error) => {
    return {
        type: OrderActionTypes.COMPLETE_ORDER_FAILED,
        payload: error.message
    }
}

export const completeOrderPending = () => {
    return {
        type: OrderActionTypes.COMPLETE_ORDER_PENDING
    }
}



