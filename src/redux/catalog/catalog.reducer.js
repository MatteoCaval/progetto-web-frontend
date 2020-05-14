import CatalogActionType from "./catalog.types";

const INITIAL_STATE = {
    categories: [],
    products: []
}

const catalogReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case CatalogActionType.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload
            }
        case CatalogActionType.FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload
            }
        case CatalogActionType.FETCH_CATEGORY_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state
    }
}

export default catalogReducer