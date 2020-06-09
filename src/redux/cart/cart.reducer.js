import CartActionTypes from "./cart.actionTypes";
import OrderActionTypes from "../orders/orders.types";

const INITIAL_STATE = {
    products: null,
    loading: false,
    total: 0,
    error: '',
    timetable: '',
    orderCompleted: false
}

const cartReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case CartActionTypes.FETCH_CART_SUCCESS:
            return {
                ...state,
                products: action.payload.cartProducts,
                total: action.payload.data.total,
                loading: false,
                error: ''
            }
        case CartActionTypes.FETCH_TODAY_TIMETABLE_SUCCESS:
            return {
                ...state,
                timetable: action.payload,
                loading: false,
                error: ''
            }
        case CartActionTypes.FETCH_CART_START:
        case CartActionTypes.REMOVE_ITEM_PENDING:
        case CartActionTypes.UPDATE_ITEM_QUANTITY_PENDING:
        case CartActionTypes.FETCH_TODAY_TIMETABLE_PENDING:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case CartActionTypes.FETCH_CART_FAILED:
        case CartActionTypes.REMOVE_ITEM_FAILED:
        case CartActionTypes.UPDATE_ITEM_QUANTITY_FAILED:
        case CartActionTypes.FETCH_TODAY_TIMETABLE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case OrderActionTypes.COMPLETE_ORDER_SUCCESS: {
            return {
                ...state,
                orderCompleted: true
            }
        }
        case CartActionTypes.CLEAR_ORDER_DATA: {
            return INITIAL_STATE
        }

        default:
            return state
    }
}

export default cartReducer


