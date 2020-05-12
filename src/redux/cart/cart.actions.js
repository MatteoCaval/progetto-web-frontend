import CartActionTypes from "./cart.actionTypes";
import axios from 'axios'
import Config from "../../config";

export const fetchCart = () => {
    return dispatch => {
        dispatch(fetchCartPending())
        axios.get('https://robohash.org/set=2')
            .then(result => {
                dispatch(fetchCartSuccess(result))
            })
            .catch(error => dispatch(fetchCartFailed(error)))

    }
}

export const fetchCartSuccess = (cart) => {
    return {
        type: CartActionTypes.FETCH_CART_SUCCESS,
        payload: cart
    }
}

export const fetchCartFailed = (error) => {
    return {
        type: CartActionTypes.FETCH_CART_SUCCESS,
        payload: error
    }
}

export const fetchCartPending = () => {
    return {
        type: CartActionTypes.FETCH_CART_START
    }
}

export const addToCart = (product) => {
    return addToCartSuccess(product)
}

export const addToCartSuccess = (product) => {
    return {
        type: CartActionTypes.ADD_ITEM_SUCCESS,
        payload: product
    }
}
