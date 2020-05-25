import AdminActionType from "./admin.types";

const INITIAL_STATE = {}

const adminReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case AdminActionType.FETCH_RIDERS_SUCCESS: {
            return {
                ...state,
                riders: action.payload
            }
        }
        case AdminActionType.DELETE_RIDER_SUCCESS: {
            return {
                ...state,
                riders: state.riders.filter(rider => rider.id !== action.payload)
            }
        }

        default:
            return state

    }
}

export default adminReducer
