import AdminActionType from "./admin.types";

const INITIAL_STATE = {}

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

        default:
            return state

    }
}

export default adminReducer
