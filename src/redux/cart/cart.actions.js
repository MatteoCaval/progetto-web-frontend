import CartActionTypes from "./cart.actionTypes";
import axios from 'axios'
import Config from "../../config";

export const fetchCart = () => {
    return (dispatch, getState) => {
        dispatch(fetchCartPending())
        const token = getState().user.currentUser.token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        axios.get(`${Config.API_BASE_URL}/user/cart`)
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

export const addToCart = (productId) => {
    return (dispatch, getState) => {
        dispatch(addToCartPending())
        const token = getState().user.currentUser.token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        axios.post(`${Config.API_BASE_URL}/user/cart`, { productId })
            .then(result => {
                dispatch(addToCartSuccess())
            })
            .catch(error => dispatch(addToCartFailed(error)))

    }
}

export const addToCartSuccess = () => {
    return {
        type: CartActionTypes.ADD_ITEM_SUCCESS
    }
}
export const addToCartFailed = (error) => {
    return {
        type: CartActionTypes.ADD_ITEM_FAILED,
        payload: error
    }
}

export const addToCartPending = () => {
    return {
        type: CartActionTypes.ADD_ITEM_PENDING
    }
}


export const removeProductFromCart = (productId) => {
    return (dispatch, getState) => {
        dispatch(removeFromCartPending())
        const token = getState().user.currentUser.token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        axios.delete(`${Config.API_BASE_URL}/user/cart/${productId}`)
            .then(result => {
                dispatch(removeFromCartSuccess())
                dispatch(fetchCart())
            })
            .catch(error => dispatch(removeFromCartFailed(error)))

    }
}

export const removeFromCartSuccess = () => {
    return {
        type: CartActionTypes.REMOVE_ITEM_SUCCESS
    }
}
export const removeFromCartFailed = (error) => {
    return {
        type: CartActionTypes.REMOVE_ITEM_FAILED,
        payload: error
    }
}

export const removeFromCartPending = () => {
    return {
        type: CartActionTypes.REMOVE_ITEM_PENDING
    }
}


