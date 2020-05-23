import AdminActionType from "./admin.types";

const adminReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case AdminActionType.FETCH_RIDERS_SUCCESS: {
            return {
                ...state,
                riders: action.payload
            }
        }

        default:
            return state

    }
}

export default adminReducer
