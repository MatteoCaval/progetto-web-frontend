import CatalogActionType from "./catalog.types";

export const INITIAL_STATE = {
    categories: [],
    products: [],
    productDetails: null,
    loading: false,
    error: ''
}

const catalogReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case CatalogActionType.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: ''
            }
        case CatalogActionType.FETCH_CATEGORIES_PENDING:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case CatalogActionType.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CatalogActionType.FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                productDetails: action.payload,
                loading: false,
                error: ''
            }
        case CatalogActionType.FETCH_PRODUCT_PENDING:
            return {
                ...state,
                productDetails: null,
                loading: true,
                error: ''
            }
        case CatalogActionType.FETCH_PRODUCT_FAILED:
            return {
                ...state,
                productDetails: null,
                loading: false,
                error: action.payload
            }
        case CatalogActionType.FETCH_CATEGORY_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: ''
            }
        case CatalogActionType.FETCH_CATEGORY_PRODUCTS_PENDING:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case CatalogActionType.FETCH_CATEGORY_PRODUCTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default catalogReducer