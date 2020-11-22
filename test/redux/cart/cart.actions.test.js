import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import CartActionTypes from "../../../src/redux/cart/cart.actionTypes";
import {
    addToCart,
    fetchCart,
    fetchTodayTimetable,
    removeProductFromCart,
    updateCartProductQuantity
} from "../../../src/redux/cart/cart.actions";
import AlertTypes from "../../../src/redux/alerts/alert.types";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('axios');

describe('cart actions', () => {

    it('should create PENDIND and SUCCESS actions on fetchCart success', () => {
        const result = { products: [] }
        const expectedActions = [
            { type: CartActionTypes.FETCH_CART_START },
            { type: CartActionTypes.FETCH_CART_SUCCESS, payload: result }
        ]
        const store = mockStore({ user: { token: 'token' } })
        axios.get.mockImplementation(() => Promise.resolve({ data: result }))

        return store.dispatch(fetchCart()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create PENDIND and SUCCESS actions and refresh cart on addToCart success', () => {
        const result = { products: [] }
        const expectedActions = [
            { type: CartActionTypes.ADD_ITEM_PENDING },
            { type: CartActionTypes.ADD_ITEM_SUCCESS },
            { type: AlertTypes.SUCCESS, payload: 'Product added to cart' }
        ]
        const store = mockStore({ user: { token: 'token' } })
        axios.post.mockImplementation(() => Promise.resolve())
        axios.get.mockImplementation(() => Promise.resolve({ data: result }))

        store.dispatch(addToCart('id', 1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create PENDIND and SUCCESS actions and refresh cart on removeProductFromCart success', () => {
        const result = { products: [] }
        const expectedActions = [
            { type: CartActionTypes.REMOVE_ITEM_PENDING },
            { type: CartActionTypes.REMOVE_ITEM_SUCCESS },
            { type: CartActionTypes.FETCH_CART_START },
            { type: CartActionTypes.FETCH_CART_SUCCESS, payload: result }

        ]
        const store = mockStore({ user: { token: 'token' } })
        axios.delete.mockImplementation(() => Promise.resolve())
        axios.get.mockImplementation(() => Promise.resolve({ data: result }))

        store.dispatch(removeProductFromCart()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create PENDIND and SUCCESS actions and refresh cart on updateCartProductQuantity success', () => {
        const result = { products: [] }
        const expectedActions = [
            { type: CartActionTypes.UPDATE_ITEM_QUANTITY_PENDING },
            { type: CartActionTypes.UPDATE_ITEM_QUANTITY_SUCCESS },
            { type: CartActionTypes.FETCH_CART_START },
            { type: CartActionTypes.FETCH_CART_SUCCESS, payload: result }

        ]
        const store = mockStore({ user: { token: 'token' } })
        axios.put.mockImplementation(() => Promise.resolve())
        axios.get.mockImplementation(() => Promise.resolve({ data: result }))

        store.dispatch(updateCartProductQuantity('id', 2)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create PENDIND and SUCCESS actions on fetchTodayTimetable success', () => {
        const result = { timetable: [] }
        const expectedActions = [
            { type: CartActionTypes.FETCH_TODAY_TIMETABLE_PENDING },
            { type: CartActionTypes.FETCH_TODAY_TIMETABLE_SUCCESS, payload: result }

        ]
        const store = mockStore({ user: { token: 'token' } })

        axios.get.mockImplementation(() => Promise.resolve({ data: result }))

        store.dispatch(fetchTodayTimetable()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})