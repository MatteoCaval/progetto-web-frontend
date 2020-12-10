import ordersReducer, {INITIAL_STATE as orderInitialState} from "../../../redux/orders/orders.reducer";
import OrderActionTypes from "../../../redux/orders/orders.types";
import {sampleMappedError} from "../networkTestUtils";


describe('order reducer', () => {

    const errorMessage = 'error'

    it('set order history on FETCH_ORDER_HISTORY_SUCCESS', () => {
        const prevState = orderInitialState
        const result = {
            orders: ['order1', 'order2'],
            pageCount: 1,
            currentPage: 1
        }
        expect(ordersReducer(prevState, {
            type: OrderActionTypes.FETCH_ORDER_HISTORY_SUCCESS,
            payload: result
        })).toMatchObject({
            orderHistory: {
                ...prevState.orderHistory,
                ...result,
                pending: false,
                error: null
            }
        })
    })


    it('clear error and set pending on FETCH_ORDER_HISTORY_PENDING', () => {
        const prevState = orderInitialState
        expect(ordersReducer(prevState, {
            type: OrderActionTypes.FETCH_ORDER_HISTORY_PENDING
        })).toMatchObject({
            orderHistory: {
                ...prevState.orderHistory,
                pending: true,
                error: null
            }
        })
    })

    it('set error on FETCH_ORDER_HISTORY_FAILED', () => {
        let error = sampleMappedError
        const prevState = orderInitialState
        expect(ordersReducer(prevState, {
            type: OrderActionTypes.FETCH_ORDER_HISTORY_FAILED,
            payload: sampleMappedError
        })).toMatchObject({
            orderHistory: {
                ...prevState.orderHistory,
                pending: false,
                error: sampleMappedError
            }
        })
    })

    it('set realTimeOrders on REAL_TIME_ORDERS', () => {
        const prevState = orderInitialState
        const orders = [{
            time: '19:30',
            creationDate: '2020-12-10T18:30:00.000Z'
        }, {
            time: '20:30',
            creationDate: '2020-12-10T18:30:00.000Z'
        }]

        expect(ordersReducer(prevState, {
            type: OrderActionTypes.REAL_TIME_ORDERS,
            payload: orders
        })).toMatchObject({
            realTimeOrders: orders
        })
    })

    it('add the new order to realTimeOrders on NEW_ORDER_RECEIVED', () => {
        const prevState = orderInitialState
        const newOrder = {
            id: 1,
            time: '19:30',
            creationDate: '2020-12-10T18:30:00.000Z'
        }
        expect(ordersReducer(prevState, {
            type: OrderActionTypes.NEW_ORDER_RECEIVED,
            payload: newOrder
        })).toMatchObject({
            realTimeOrders: [
                ...(prevState.realTimeOrders ? prevState.realTimeOrders : []),
                newOrder
            ]
        })
    })

    describe('on ORDER_UPDATED', () => {
        it('should add order to list if was not present before', () => {
            const prevState = {
                ...orderInitialState,
                realTimeOrders: [{
                    _id: 1,
                    time: '19:30',
                    creationDate: '2020-12-10T18:30:00.000Z'
                }]
            }
            const updatedOrder = {
                _id: 2,
                time: '19:30',
                creationDate: '2020-12-10T18:30:00.000Z'
            }
            expect(ordersReducer(prevState, {
                type: OrderActionTypes.ORDER_UPDATED,
                payload: updatedOrder
            })).toMatchObject({
                realTimeOrders: [
                    updatedOrder,
                    ...prevState.realTimeOrders,
                ]
            })
        })

        it('should update the list if was present before', () => {
            const prevState = {
                ...orderInitialState,
                realTimeOrders: [{
                    _id: 1,
                    time: '19:30',
                    creationDate: '2020-12-10T18:30:00.000Z'
                }]
            }
            const updatedOrder = {
                _id: 1,
                time: '19:30',
                creationDate: '2020-12-10T18:30:00.000Z'
            }
            expect(ordersReducer(prevState, {
                type: OrderActionTypes.ORDER_UPDATED,
                payload: updatedOrder
            })).toMatchObject({
                realTimeOrders: [
                    updatedOrder
                ]
            })
        })
    })


})