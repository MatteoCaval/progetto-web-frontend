import ProductOperationType from "./product-operations.type";

/**
 * State for editing actions: ex. product creation or update
 *
 */

const INITIAL_STATE = {
    loading: false,
    error: '',
    completed: false
}

const productOperationsReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case ProductOperationType.CREATE_PRODUCT_SUCCESS:
        case ProductOperationType.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                completed: true,
                error: ''
            }
        case ProductOperationType.CREATE_PRODUCT_FAILED:
        case ProductOperationType.UPDATE_PRODUCT_FAILED:
            return {
                ...state,
                loading: false,
                completed: false,
                error: action.payload
            }
        case ProductOperationType.CREATE_PRODUCT_PENDING:
        case ProductOperationType.UPDATE_PRODUCT_PENDING:
            return {
                ...state,
                loading: true,
                completed: false,
                error: ''
            }
        case ProductOperationType.RESET_STATE: {
            return INITIAL_STATE
        }
        default:
            return state
    }
}

export default productOperationsReducer