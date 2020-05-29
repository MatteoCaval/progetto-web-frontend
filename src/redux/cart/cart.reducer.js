import CartActionTypes from "./cart.actionTypes";
import TimetableActionTypes from "./../timetable/timetable.actionTypes";

const INITIAL_STATE = {
    products: [],
    loading: false,
    total: 0,
    error: '',
    timetable: ''
}

const cartReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case CartActionTypes.FETCH_CART_SUCCESS:
            return {
                ...state,
                products: action.payload.data.cartProducts,
                total: action.payload.data.total,
                loading: false,
                error: ''
            }
        case TimetableActionTypes.FETCH_TODAY_TIMETABLE_SUCCESS:
            return {
                ...state,
                timetable: action.payload.data,
                loading: false,
                error: ''
            }
        case CartActionTypes.FETCH_CART_START:
        case CartActionTypes.REMOVE_ITEM_PENDING:
        case CartActionTypes.UPDATE_ITEM_QUANTITY_PENDING:
        case TimetableActionTypes.FETCH_TODAY_TIMETABLE_PENDING:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case CartActionTypes.FETCH_CART_FAILED:
        case CartActionTypes.REMOVE_ITEM_FAILED:
        case CartActionTypes.UPDATE_ITEM_QUANTITY_FAILED:
        case TimetableActionTypes.FETCH_TODAY_TIMETABLE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default cartReducer


