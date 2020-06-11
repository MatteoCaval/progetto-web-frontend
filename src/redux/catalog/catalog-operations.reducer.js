import CatalogOperationType from "./catalog-operations.type";

/**
 * State for editing actions: ex. product creation or update
 *
 */

export const INITIAL_STATE = {
    loading: false,
    error: '',
    completed: false
}

const catalogOperationsReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case CatalogOperationType.CREATE_PRODUCT_SUCCESS:
        case CatalogOperationType.UPDATE_PRODUCT_SUCCESS:
        case CatalogOperationType.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                completed: true,
                error: ''
            }
        case CatalogOperationType.CREATE_PRODUCT_FAILED:
        case CatalogOperationType.UPDATE_PRODUCT_FAILED:
        case CatalogOperationType.CREATE_CATEGORY_FAILED:
            return {
                ...state,
                loading: false,
                completed: false,
                error: action.payload
            }
        case CatalogOperationType.CREATE_PRODUCT_PENDING:
        case CatalogOperationType.UPDATE_PRODUCT_PENDING:
        case CatalogOperationType.CREATE_CATEGORY_PENDING:
            return {
                ...state,
                loading: true,
                completed: false,
                error: ''
            }
        case CatalogOperationType.RESET_STATE: {
            return INITIAL_STATE
        }
        default:
            return state
    }
}

export default catalogOperationsReducer