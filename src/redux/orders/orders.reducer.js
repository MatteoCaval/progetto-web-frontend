import OrderActionTypes from "./orders.types";

const INITIAL_STATE = {
    orderHistory: {}

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
        default:
            return state
    }
}