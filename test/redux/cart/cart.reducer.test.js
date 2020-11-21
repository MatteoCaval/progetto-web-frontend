import { INITIAL_STATE as cartInitialState } from "../../../src/redux/cart/cart.reducer";
import cartReducer from "../../../src/redux/cart/cart.reducer";
import CartActionTypes from "../../../src/redux/cart/cart.actionTypes";
import OrderActionTypes from "../../../src/redux/orders/orders.types";

describe('cart reducer', () => {

    it('should set cart products and total on FETCH_CART_SUCCESS', () => {
        const prevState = cartInitialState
        const products = ['prod1', 'prod2']
        const total = 20

        expect(cartReducer(prevState, {
            type: CartActionTypes.FETCH_CART_SUCCESS,
            payload: { cartProducts: products, total: total }
        })).toEqual({
            ...prevState,
            products,
            total,
            loading: false,
            error: null
        })
    })

    it('should set timetable on FETCH_TODAY_TIMETABLE_SUCCESS', () => {
        const prevState = cartInitialState
        const timetable = {}

        expect(cartReducer(prevState, {
            type: CartActionTypes.FETCH_TODAY_TIMETABLE_SUCCESS,
            payload: timetable
        })).toEqual({
            ...prevState,
            timetable,
            loading: false,
            error: null
        })

    })

    it('should set orderCompleted on COMPLETE_ORDER_SUCCESS', () => {
        const prevState = cartInitialState
        expect(prevState.orderCompleted).toBeFalsy()
        expect(cartReducer(prevState, {
            type: OrderActionTypes.COMPLETE_ORDER_SUCCESS
        })).toMatchObject({ orderCompleted: true })
    })

    it('should restore initial state on CLEAR_ORDER_DATA', () => {
        const prevState = {
            ...cartInitialState,
            orderCompleted: true,
            error: null,
            loading: true
        }

        expect(cartReducer(prevState, {
            type: CartActionTypes.CLEAR_ORDER_DATA
        })).toEqual(cartInitialState)
    })

})