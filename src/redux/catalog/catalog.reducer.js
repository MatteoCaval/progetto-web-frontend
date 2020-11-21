import CatalogActionType from "./catalog.types";
import CatalogOperationType from "./catalog-operations.type";

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
                error: action.payload.description
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
                error: action.payload.description
            }
        case CatalogOperationType.REMOVE_CATEGORY_SUCCESS: {
            const categoryId = action.payload
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== categoryId)
            }
        }
        case CatalogOperationType.REMOVE_PRODUCT_SUCCESS: {
            const productId = action.payload
            return {
                ...state,
                products: state.products.filter(product => product.id !== productId)
            }
        }
        case CatalogOperationType.CREATE_CATEGORY_SUCCESS: {
            return {
                ...state,
                categories: [
                    ...state.categories,
                    action.payload
                ]
            }
        }
        case CatalogOperationType.UPDATE_PRODUCT_SUCCESS: {
            const updatedProduct = action.payload
            console.log(updatedProduct)
            return {
                ...state,
                products: state.products.map(product => product.id === updatedProduct.id ? updatedProduct : product)
            }
        }
        case CatalogOperationType.CREATE_PRODUCT_SUCCESS: {
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload
                ]
            }
        }
        default:
            return state
    }
}

export default catalogReducer