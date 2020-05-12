import CartActionTypes from "./cart.actionTypes";

const INITIAL_STATE = {
    products: []
}

const cartReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case CartActionTypes.ADD_ITEM_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        default:
            return state

    }
}

export default cartReducer


