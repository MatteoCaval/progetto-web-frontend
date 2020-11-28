import AdminActionType from "./admin.types";

export const INITIAL_STATE = {
    timetable: null,
    timetableLoading: false,
    timetableError: null
}

const adminReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case AdminActionType.FETCH_RIDERS_SUCCESS: {
            return {
                riders: action.payload
            }
        }
        case AdminActionType.FETCH_RIDERS_PENDING: {
            return {
                loading: true
            }
        }
        case AdminActionType.FETCH_RIDERS_FAILED: {
            return {
                error: action.payload
            }
        }
        case AdminActionType.DELETE_RIDER_SUCCESS: {
            return {
                ...state,
                riders: state.riders.filter(rider => rider.id !== action.payload)
            }
        }
        case AdminActionType.CREATE_RIDER_PENDING: {
            return {
                ...state,
                riderCreation: {
                    pending: true
                }
            }
        }
        case AdminActionType.CREATE_RIDER_FAILED: {
            return {
                ...state,
                riderCreation: {
                    error: action.payload
                }
            }
        }
        case AdminActionType.CREATE_RIDER_SUCCESS: {
            return {
                ...state,
                riderCreation: {}
            }
        }

        case AdminActionType.FETCH_TIMETABLE_SUCCESS: {
            return {
                ...state,
                timetable: action.payload,
                timetableError: null,
                timetableLoading: false
            }
        }

        case AdminActionType.FETCH_TIMETABLE_PENDING: {
            return {
                ...state,
                timetable: action.payload,
                timetableError: null,
                timetableLoading: true
            }
        }

        case AdminActionType.FETCH_TIMETABLE_FAILED: {
            return {
                ...state,
                timetableError: action.payload,
                timetableLoading: false
            }
        }

        default:
            return state

    }
}

export default adminReducer
