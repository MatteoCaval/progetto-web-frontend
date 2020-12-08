import OrderActionTypes from "./orders.types";
import axios from 'axios'
import Config from "../../config";
import { orderService } from "../../services/orders.service";
import { alertActions } from "../alerts/alert.actions";
import io from "socket.io-client";
import getAuthHeader from "../../services/getAuthHeader";
import {mapNetworkError} from "../networkUtils";

export const completeOrder = (orderData) => {
    return (dispatch, getState) => {
        dispatch(completeOrderPending())
        const token = getState().user.data.token
        return axios.post(`${Config.API_BASE_URL}/orders`, orderData, getAuthHeader(token))
            .then(result => {
                dispatch(completeOrderSuccess())
            })
            .catch(error => {
                dispatch(alertActions.error(error.message))
                dispatch(completeOrderFailed(error.message))
            })

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

export const updateOrder = (orderId, state, riderId) => {
    return (dispatch, getState) => {
        const token = getState().user.data.token
        dispatch(updateOrderPending())
        return axios.put(`${Config.API_BASE_URL}/orders/${orderId}`, { state, riderId }, getAuthHeader(token))
            .then(() => {
                dispatch(updateOrderSuccess())
            })
            .catch(error =>
                dispatch(updateOrderFailed(error)))
    }
}

const updateOrderSuccess = () => {
    return {
        type: OrderActionTypes.UPDATE_ORDER_SUCCESS,
    }
}

const updateOrderFailed = (errorMessage) => {
    return {
        type: OrderActionTypes.UPDATE_ORDER_FAILED,
        payload: errorMessage
    }
}

const updateOrderPending = () => {
    return {
        type: OrderActionTypes.UPDATE_ORDER_PENDING
    }
}

export const fetchOrderHistory = (page = 1) => {
    return (dispatch, getState) => {
        dispatch(fetchOrderHistoryPending())
        const token = getState().user.data.token
        return orderService.fetchOrderHistory(token, getState().user.data.role, page)
            .then(result => dispatch(fetchOrderHistorySuccess(result.data)))
            .catch(error => {
                dispatch(fetchOrderHistoryFailed(mapNetworkError(error)))
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

const fetchOrderHistoryFailed = (error) => {
    return {
        type: OrderActionTypes.FETCH_ORDER_HISTORY_FAILED,
        payload: error
    }
}

const fetchOrderHistoryPending = () => {
    return {
        type: OrderActionTypes.FETCH_ORDER_HISTORY_PENDING
    }
}

// real time actions

let socket = undefined
export const startLiveOrderUpdated = () => {
    return (dispatch, getState) => {
        const token = getState().user.data.token
        socket = io.connect(Config.API_BASE_URL, { query: { token } })
        socket.on('orders', orders => {
            dispatch(realTimeOrders(orders))
        })
        socket.on('newOrder', order => {
            dispatch(newOrderReceived(order))
        })
        socket.on('orderUpdated', order => {
            dispatch(orderUpdated(order))
        })
    }
}

export const stopLiveOrderUpdated = () => {
    return () => {
        socket.disconnect()
    }
}

export const realTimeOrders = (orders) => {
    return {
        type: OrderActionTypes.REAL_TIME_ORDERS,
        payload: orders
    }
}

export const newOrderReceived = (order) => {
    return {
        type: OrderActionTypes.NEW_ORDER_RECEIVED,
        payload: order
    }
}

export const orderUpdated = (order) => {
    return {
        type: OrderActionTypes.ORDER_UPDATED,
        payload: order
    }
}







