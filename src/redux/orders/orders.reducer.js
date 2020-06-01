import OrderActionTypes from "./orders.types";

const INITIAL_STATE = {
    orderHistory: {},
    realTimeOrders: []

}

const ordersReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case OrderActionTypes.FETCH_ORDER_HISTORY_SUCCESS:
            const { currentPage, pageCount, orders } = action.payload
            return {
                ...state,
                orderHistory: {
                    ...state.orderHistory,
                    currentPage,
                    pageCount,
                    orders,
                    pending: false,
                    error: ''
                }
            }
        case OrderActionTypes.FETCH_ORDER_HISTORY_PENDING: {
            return {
                ...state,
                orderHistory: {
                    ...state.orderHistory,
                    pending: true,
                    error: ''
                }
            }
        }
        case OrderActionTypes.FETCH_ORDER_HISTORY_FAILED: {
            return {
                ...state,
                orderHistory: {
                    ...state.orderHistory,
                    pending: false,
                    error: action.payload
                }
            }
        }
        case OrderActionTypes.REAL_TIME_ORDERS: {
            return {
                ...state,
                realTimeOrders: action.payload
            }
        }
        case OrderActionTypes.NEW_ORDER_RECEIVED: {
            return {
                ...state,
                realTimeOrders: [
                    ...state.realTimeOrders,
                    action.payload
                ]
            }
        }
        case OrderActionTypes.ORDER_UPDATED: {
            const updatedOrder = action.payload
            return {
                ...state,
                realTimeOrders: state.realTimeOrders.map(
                    order => {
                        return order._id === updatedOrder._id ? updatedOrder : order
                    }
                )
            }
        }

        default:
            return state
    }
}

export default ordersReducer