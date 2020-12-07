import OrderActionTypes from "./orders.types";

export const INITIAL_STATE = {
    orderHistory: {},
    realTimeOrders: null
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
                    error: null
                }
            }
        case OrderActionTypes.FETCH_ORDER_HISTORY_PENDING: {
            return {
                ...state,
                orderHistory: {
                    ...state.orderHistory,
                    pending: true,
                    error: null
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
            const orderPresent = state.realTimeOrders.find(order => order._id === updatedOrder._id)
            return {
                ...state,
                realTimeOrders: orderPresent ? state.realTimeOrders.map(
                    order => { // se l'ordine aggiornato era presente in lista lo aggiorno
                        return order._id === updatedOrder._id ? updatedOrder : order
                    })
                    : [updatedOrder, ...state.realTimeOrders] // se l'ordine aggiornato non era presente in lista lo aggiungo
            }
        }

        default:
            return state
    }
}

export default ordersReducer