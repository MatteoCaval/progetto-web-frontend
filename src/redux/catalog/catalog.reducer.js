import CatalogActionType from "./catalog.types";

const INITIAL_STATE = {
    categories: [],
    products: [],
    productDetails: null
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
                productDetails: action.payload
            }
        case CatalogActionType.FETCH_PRODUCT_PENDING:
            return {
                ...state,
                productDetails: null
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