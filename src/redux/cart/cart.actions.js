import CartActionTypes from "./cart.actionTypes";
import { alertActions } from "../alerts/alert.actions";
import { userService } from "../../services/user.service";
import {mapNetworkError} from "../networkUtils";

export const fetchCart = () => {
    return (dispatch, getState) => {
        dispatch(fetchCartPending())
        const token = getState().user.data.token
        return userService.fetchCart(token)
            .then(result => {
                dispatch(fetchCartSuccess(result.data))
            })
            .catch(error => dispatch(fetchCartFailed(mapNetworkError(error))))

    }
}

const fetchCartSuccess = (cart) => {
    return {
        type: CartActionTypes.FETCH_CART_SUCCESS,
        payload: cart
    }
}

const fetchCartFailed = (error) => {
    return {
        type: CartActionTypes.FETCH_CART_FAILED,
        payload: error
    }
}

const fetchCartPending = () => {
    return {
        type: CartActionTypes.FETCH_CART_START
    }
}

export const addToCart = (productId, quantity) => {
    return (dispatch, getState) => {
        dispatch(addToCartPending())
        const token = getState().user.data.token
        return userService.addToCart(productId, quantity, token)
            .then(result => {
                dispatch(addToCartSuccess())
                dispatch(alertActions.success('Product added to cart'))
                dispatch(fetchCart())
            })
            .catch(error => dispatch(addToCartFailed(mapNetworkError(error))))

    }
}

const addToCartSuccess = () => {
    return {
        type: CartActionTypes.ADD_ITEM_SUCCESS
    }
}
const addToCartFailed = (error) => {
    return {
        type: CartActionTypes.ADD_ITEM_FAILED,
        payload: error
    }
}

const addToCartPending = () => {
    return {
        type: CartActionTypes.ADD_ITEM_PENDING
    }
}


export const removeProductFromCart = (productId) => {
    return (dispatch, getState) => {
        dispatch(removeFromCartPending())
        const token = getState().user.data.token
        return userService.removeProductFromCart(productId, token)
            .then(result => {
                dispatch(removeFromCartSuccess())
                dispatch(fetchCart())
            })
            .catch(error => dispatch(removeFromCartFailed(mapNetworkError(error))))

    }
}

const removeFromCartSuccess = () => {
    return {
        type: CartActionTypes.REMOVE_ITEM_SUCCESS
    }
}
const removeFromCartFailed = (error) => {
    return {
        type: CartActionTypes.REMOVE_ITEM_FAILED,
        payload: error
    }
}

const removeFromCartPending = () => {
    return {
        type: CartActionTypes.REMOVE_ITEM_PENDING
    }
}

export const updateCartProductQuantity = (productId, quantity) => {
    return (dispatch, getState) => {
        dispatch(updateCartProductQuantityPending())
        const token = getState().user.data.token
        return userService.updateProductQuantity(productId, quantity, token)
            .then(result => {
                dispatch(updateCartProductQuantitySuccess())
                dispatch(fetchCart())
            })
            .catch(error => dispatch(updateCartProductQuantityFailed(mapNetworkError(error))))

    }
}

const updateCartProductQuantitySuccess = () => {
    return {
        type: CartActionTypes.UPDATE_ITEM_QUANTITY_SUCCESS
    }
}
const updateCartProductQuantityFailed = (error) => {
    return {
        type: CartActionTypes.UPDATE_ITEM_QUANTITY_FAILED,
        payload: error
    }
}

const updateCartProductQuantityPending = () => {
    return {
        type: CartActionTypes.UPDATE_ITEM_QUANTITY_PENDING
    }
}

export const fetchTodayTimetable = () => {
    return (dispatch, getState) => {
        dispatch(fetchTodayTimetablePending())
        const token = getState().user.data.token
        return userService.fetchTodayTimetable(token)
            .then(result => {
                dispatch(fetchTodayTimetableSuccess(result.data))
            })
            .catch(error => {
                dispatch(fetchTodayTimetableFailed(mapNetworkError(error)))
                dispatch(alertActions.error("Error retrieving today's timetable"))
            })
    }
}


const fetchTodayTimetableSuccess = (timetable) => {
    return {
        type: CartActionTypes.FETCH_TODAY_TIMETABLE_SUCCESS,
        payload: timetable
    }
}

const fetchTodayTimetableFailed = (error) => {
    return {
        type: CartActionTypes.FETCH_TODAY_TIMETABLE_FAILED,
        payload: error
    }
}

const fetchTodayTimetablePending = () => {
    return {
        type: CartActionTypes.FETCH_TODAY_TIMETABLE_PENDING
    }
}

export const clearOrderData = () => {
    return {
        type: CartActionTypes.CLEAR_ORDER_DATA
    }
}


