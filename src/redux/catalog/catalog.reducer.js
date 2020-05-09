import CatalogActionType from "./catalog.types";

const INITIAL_STATE = {
    categories: []
}

const catalogReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case CatalogActionType.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
}

export default catalogReducer