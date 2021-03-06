import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import OrderActionTypes from "../../../redux/orders/orders.types";
import {completeOrder, fetchOrderHistory, updateOrder} from "../../../redux/orders/orders.actions";
import UserRoles from "../../../common/UserRoles";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('axios');

describe('async order actions', () => {

    const stateWToken = { user: { data: { token: 'token' } } }

    it('create PENDING and SUCCESS actions on completeOrder', () => {
        const expectedActions = [
            { type: OrderActionTypes.COMPLETE_ORDER_PENDING },
            { type: OrderActionTypes.COMPLETE_ORDER_SUCCESS }
        ]

        const store = mockStore(stateWToken)

        axios.post.mockImplementation(() => Promise.resolve())

        return store.dispatch(completeOrder({}))
            .then(() => expect(store.getActions()).toEqual(expectedActions))

    })

    it('create PENDING and SUCCESS actions on updateOrder', () => {
        const expectedActions = [
            { type: OrderActionTypes.UPDATE_ORDER_PENDING },
            { type: OrderActionTypes.UPDATE_ORDER_SUCCESS }
        ]

        const store = mockStore(stateWToken)
        axios.put.mockImplementation(() => Promise.resolve())

        return store.dispatch(updateOrder('orderId', {}, 'riderId'))
            .then(() => expect(store.getActions()).toEqual(expectedActions))

    })

    it('create PENDING and SUCCESS actions on fetchOrderHistory', () => {
        const orders = ['order1', 'order2', 'order3']
        const expectedActions = [
            { type: OrderActionTypes.FETCH_ORDER_HISTORY_PENDING },
            { type: OrderActionTypes.FETCH_ORDER_HISTORY_SUCCESS, }
        ]

        const store = mockStore({ user: { data: { token: 'token', role: UserRoles.ADMIN } } })
        axios.get.mockImplementation(() => Promise.resolve(orders))

        return store.dispatch(fetchOrderHistory())
            .then(() => expect(store.getActions()).toEqual(expectedActions))

    })

})
