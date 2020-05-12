import CartActionTypes from "./cart.actionTypes";

const INITIAL_STATE = {
    products: [],
    isPending: false,
    error: ''
}

const testCartProducts = [
    {
        id: 1,
        name: 'prod1',
        quantity: 1,
        price: '30€'
    },
    {
        id: 2,
        name: 'prod2',
        quantity: 3,
        price: '30€'
    },
    {
        id: 3,
        name: 'prod3',
        quantity: 1,
        price: '30€'
    }
]

const cartReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case CartActionTypes.ADD_ITEM_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case CartActionTypes.FETCH_CART_SUCCESS:
            return {
                ...state,
                products: testCartProducts, //action.payload,
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


