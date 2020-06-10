import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import { createRider, deleteRider, fetchRiders, fetchTimetable, updateTimetable } from "../../../src/redux/admin/admin.actions";
import AdminActionType from "../../../src/redux/admin/admin.types";
import AlertTypes from "../../../src/redux/alerts/alert.types";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('axios');

describe('admin actions', () => {

    it('should return pending and success actions on fetchRiders success', () => {
        const riders = ['rider1', 'rider2']
        const expectedActions = [
            { type: AdminActionType.FETCH_RIDERS_PENDING },
            { type: AdminActionType.FETCH_RIDERS_SUCCESS, payload: riders }
        ]

        const store = mockStore({ user: { token: 'token' } })
        axios.get.mockImplementation(() => Promise.resolve({ data: riders }))

        return store.dispatch(fetchRiders()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should return pending and success actions and notify on deleteRider success', () => {
        const riderId = 'id'
        const expectedActions = [
            { type: AdminActionType.DELETE_RIDER_PENDING },
            { type: AdminActionType.DELETE_RIDER_SUCCESS, payload: riderId },
            { type: AlertTypes.SUCCESS, payload: 'Rider removed' },
        ]

        const store = mockStore({ user: { token: 'token' } })
        axios.delete.mockImplementation(() => Promise.resolve())

        return store.dispatch(deleteRider(riderId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should return pending, success actions, notify rider creation and fetchRiders on createRider success', () => {
        const riders = ['rider1', 'rider2']
        const expectedActions = [
            { type: AdminActionType.CREATE_RIDER_PENDING },
            { type: AdminActionType.CREATE_RIDER_SUCCESS },
            { type: AlertTypes.SUCCESS, payload: 'Rider created' },
            { type: AdminActionType.FETCH_RIDERS_PENDING },
            { type: AdminActionType.FETCH_RIDERS_SUCCESS, payload: riders }
        ]
        const fakeRider = { name: 'rider' }

        const store = mockStore({ user: { token: 'token' } })

        axios.post.mockImplementation(() => Promise.resolve())
        axios.get.mockImplementation(() => Promise.resolve({ data: riders }))

        return store.dispatch(createRider(fakeRider)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should return pending and success actions on fetchTimetable success', () => {

        const timetable = {}
        const expectedActions = [
            { type: AdminActionType.FETCH_TIMETABLE_PENDING },
            { type: AdminActionType.FETCH_TIMETABLE_SUCCESS, payload: timetable }
        ]

        const store = mockStore({ user: { token: 'token' } })

        axios.get.mockImplementation(() => Promise.resolve({ data: timetable }))

        return store.dispatch(fetchTimetable()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should return pending and success actions and notify on updateTimetable sucess', () => {
        const fakeTimetable = {}
        const expectedActions = [
            { type: AdminActionType.UPDATE_TIMETABLE_PENDING },
            { type: AdminActionType.UPDATE_TIMETABLE_SUCCESS },
            { type: AlertTypes.SUCCESS, payload: 'Timetable updated' },
        ]
        const store = mockStore({ user: { token: 'token' } })

        axios.put.mockImplementation(() => Promise.resolve())

        return store.dispatch(updateTimetable(fakeTimetable)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})