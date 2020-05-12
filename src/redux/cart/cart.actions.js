import CartActionTypes from "./cart.actionTypes";
import axios from 'axios'
import Config from "../../config";

export const fetchCart = (dispatch) => {
    return dispatch => {
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
