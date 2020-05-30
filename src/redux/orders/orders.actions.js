import OrderActionTypes from "./orders.types";
import axios from 'axios'
import Config from "../../config";
import { orderService } from "../../services/orders.service";
import { alertActions } from "../alerts/alert.actions";

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

const completeOrderSuccess = () => {
    return {
        type: OrderActionTypes.COMPLETE_ORDER_SUCCESS
    }
}

const completeOrderFailed = (error) => {
    return {
        type: OrderActionTypes.COMPLETE_ORDER_FAILED,
        payload: error.message
    }
}

const completeOrderPending = () => {
    return {
        type: OrderActionTypes.COMPLETE_ORDER_PENDING
    }
}

export const fetchOrderHistory = (page = 1) => {
    return (dispatch, getState) => {
        dispatch(fetchOrderHistoryPending())
        const token = getState().user.currentUser.token
        orderService.fetchOrderHistory(token, page)
            .then(result => dispatch(fetchOrderHistorySuccess(result.data)))
            .catch(error => {
                dispatch(fetchOrderHistoryFailed(error.message))
                dispatch(alertActions.error(error.message))
            })

    }
}

const fetchOrderHistorySuccess = (resultData) => {
    return {
        type: OrderActionTypes.FETCH_ORDER_HISTORY_SUCCESS,
        payload: resultData
    }
}

const fetchOrderHistoryFailed = (errorMessage) => {
    return {
        type: OrderActionTypes.FETCH_ORDER_HISTORY_FAILED,
        payload: errorMessage
    }
}

const fetchOrderHistoryPending = () => {
    return {
        type: OrderActionTypes.FETCH_ORDER_HISTORY_PENDING
    }
}





