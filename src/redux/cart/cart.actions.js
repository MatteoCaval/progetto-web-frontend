import CartActionTypes from "./cart.actionTypes";
import { alertActions } from "../alerts/alert.actions";
import { userService } from "../../services/user.service";

export const fetchCart = () => {
    return (dispatch, getState) => {
        dispatch(fetchCartPending())
        const token = getState().user.token
        userService.fetchCart(token)
            .then(result => {
                dispatch(fetchCartSuccess(result))
            })
            .catch(error => dispatch(fetchCartFailed(error.message)))

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
        type: CartActionTypes.FETCH_CART_FAILED,
        payload: error
    }
}

export const fetchCartPending = () => {
    return {
        type: CartActionTypes.FETCH_CART_START
    }
}

export const addToCart = (productId, quantity) => {
    return (dispatch, getState) => {
        dispatch(addToCartPending())
        const token = getState().user.token
        userService.addToCart(productId, quantity, token)
            .then(result => {
                dispatch(addToCartSuccess())
                dispatch(alertActions.success('Product added to cart'))
            })
            .catch(error => dispatch(addToCartFailed(error.message)))

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
        const token = getState().user.token
        userService.removeProductFromCart(productId, token)
            .then(result => {
                dispatch(removeFromCartSuccess())
                dispatch(fetchCart())
            })
            .catch(error => dispatch(removeFromCartFailed(error.message)))

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

export const updateCartProductQuantity = (productId, quantity) => {
    return (dispatch, getState) => {
        dispatch(updateCartProductQuantityPending())
        const token = getState().user.token
        userService.updateProductQuantity(productId, quantity, token)
            .then(result => {
                dispatch(updateCartProductQuantitySuccess())
                dispatch(fetchCart())
            })
            .catch(error => dispatch(updateCartProductQuantityFailed(error.message)))

    }
}

export const updateCartProductQuantitySuccess = () => {
    return {
        type: CartActionTypes.UPDATE_ITEM_QUANTITY_SUCCESS
    }
}
export const updateCartProductQuantityFailed = (error) => {
    return {
        type: CartActionTypes.UPDATE_ITEM_QUANTITY_FAILED,
        payload: error
    }
}

export const updateCartProductQuantityPending = () => {
    return {
        type: CartActionTypes.UPDATE_ITEM_QUANTITY_PENDING
    }
}

export const fetchTodayTimetable = () => {
    return (dispatch, getState) => {
        dispatch(fetchTodayTimetablePending())
        const token = getState().user.token
        userService.fetchTodayTimetable(token)
            .then(result => {
                dispatch(fetchTodayTimetableSuccess(result))
            })
            .catch(error => dispatch(fetchTodayTimetableFailed(error.message)))
    }
}


export const fetchTodayTimetableSuccess = (timetable) => {
    return {
        type: CartActionTypes.FETCH_TODAY_TIMETABLE_SUCCESS,
        payload: timetable
    }
}

export const fetchTodayTimetableFailed = (error) => {
    return {
        type: CartActionTypes.FETCH_TODAY_TIMETABLE_FAILED,
        payload: error
    }
}

export const fetchTodayTimetablePending = () => {
    return {
        type: CartActionTypes.FETCH_TODAY_TIMETABLE_PENDING
    }
}

export const clearOrderData = () => {
    return {
        type: CartActionTypes.CLEAR_ORDER_DATA
    }
}


