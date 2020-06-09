import adminReducer, { INITIAL_STATE as adminInitialState } from "./admin.reducer";
import AdminActionType from "./admin.types";

describe('admin reducer', () => {

    it('should set rider on FETCH_RIDERS_SUCCESS', () => {
        const prevState = adminInitialState
        expect(prevState.riders).toBeUndefined()

        const riders = ['rider1', 'rider2']

        expect(adminReducer(prevState, {
            type: AdminActionType.FETCH_RIDERS_SUCCESS,
            payload: riders
        })).toMatchObject({ riders })

    })

    it('should set loading on FETCH_RIDERS_PENDING', () => {
        const prevState = adminInitialState

        expect(adminReducer(prevState, {
            type: AdminActionType.FETCH_RIDERS_PENDING
        })).toMatchObject({ loading: true })
    })

    it('should set error on FETCH_RIDERS_FAILED', () => {
        const prevState = adminInitialState
        const errorMessage = 'error'

        expect(adminReducer(prevState, {
            type: AdminActionType.FETCH_RIDERS_FAILED,
            payload: errorMessage
        })).toMatchObject({ error: errorMessage })
    })


    it('should remove rider from state on DELETE_RIDER_SUCCESS', () => {
        const prevState = {
            ...adminInitialState,
            riders: [
                {
                    id: 1,
                    name: 'rider1'
                },
                {
                    id: 2,
                    name: 'rider2'
                }
            ]
        }

        expect(adminReducer(prevState, {
            type: AdminActionType.DELETE_RIDER_SUCCESS,
            payload: 1
        })).toMatchObject({
            riders: [{
                id: 2,
                name: 'rider2'
            }]
        })
    })


    // todo parte di create rider

    it('should set pending rider creation on CREATE_RIDER_PENDING', () => {
        const prevState = adminInitialState
        expect(adminReducer(prevState, {
            type: AdminActionType.CREATE_RIDER_PENDING
        })).toMatchObject({
            riderCreation: { pending: true }
        })
    })

    it('should set rider creation error on CREATE_RIDER_FAILED', () => {
        const prevState = adminInitialState
        const errorMessage = 'error'
        expect(adminReducer(prevState, {
            type: AdminActionType.CREATE_RIDER_FAILED,
            payload: errorMessage
        })).toMatchObject({
            riderCreation: { error: errorMessage }
        })
    })

    it('should reset rider creation state on CREATE_RIDER_SUCCESS', () => {
        const prevState = {
            ...adminInitialState,
            riderCreation: { pending: true }
        }
        const errorMessage = 'error'
        expect(adminReducer(prevState, {
            type: AdminActionType.CREATE_RIDER_SUCCESS,
            payload: errorMessage
        })).toMatchObject({
            riderCreation: {}
        })
    })


    it('should set timetable on FETCH_TIMETABLE_SUCCESS', () => {
        const prevState = adminInitialState

        const timetable = [{
            name: 'Monday',
            launchOpen: false,
            dinnerOpen: false
        }]

        expect(adminReducer(prevState, {
            type: AdminActionType.FETCH_TIMETABLE_SUCCESS,
            payload: timetable
        })).toMatchObject({ timetable })

    })

})