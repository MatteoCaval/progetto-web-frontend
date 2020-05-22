import CartActionTypes from "./cart.actionTypes";

const INITIAL_STATE = {
    products: [],
    isPending: false,
    total: 0,
    error: ''
}

const cartReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case CartActionTypes.FETCH_CART_SUCCESS:
            return {
                ...state,
                products: action.payload.data.cartProducts,
                total: action.payload.data.total,
                isPending: false,
                error: ''
            }
        case CartActionTypes.FETCH_CART_START:
            return {
                ...state,
                isPending: true
            }
        case CartActionTypes.FETCH_CART_FAILED:
            return {
                ...state,
                isPending: false,
                error: action.payload
                }
        default:
            return state
    }
}

export default cartReducer


