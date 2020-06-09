import productOperationsReducer, { INITIAL_STATE as operationInitialState } from "./product-operations.reducer";
import ProductOperationType from "./product-operations.type";

describe('product operations reducer', () => {

    it('should set completed on CREATE_PRODUCT_SUCCESS', () => {
        expect(productOperationsReducer(operationInitialState, {
            type: ProductOperationType.CREATE_PRODUCT_SUCCESS
        })).toMatchObject({
            loading: false,
            completed: true,
            error: ''
        })
    })

    it('should set completed on UPDATE_PRODUCT_SUCCESS', () => {
        expect(productOperationsReducer(operationInitialState, {
            type: ProductOperationType.UPDATE_PRODUCT_SUCCESS
        })).toMatchObject({
            loading: false,
            completed: true,
            error: ''
        })
    })

    it('should set error on CREATE_PRODUCT_FAILED', () => {
        const errorMessage = 'error'
        expect(productOperationsReducer(operationInitialState, {
            type: ProductOperationType.CREATE_PRODUCT_FAILED,
            payload: errorMessage
        })).toMatchObject({
            loading: false,
            completed: false,
            error: errorMessage
        })
    })

    it('should set error on UPDATE_PRODUCT_FAILED', () => {
        const errorMessage = 'error'
        expect(productOperationsReducer(operationInitialState, {
            type: ProductOperationType.UPDATE_PRODUCT_FAILED,
            payload: errorMessage
        })).toMatchObject({
            loading: false,
            completed: false,
            error: errorMessage
        })
    })

    it('should set loading on CREATE_PRODUCT_PENDING', () => {
        expect(productOperationsReducer(operationInitialState, {
            type: ProductOperationType.CREATE_PRODUCT_PENDING
        })).toMatchObject({
            loading: true,
            completed: false,
            error: ''
        })
    })

    it('should set loading on UPDATE_PRODUCT_PENDING', () => {
        expect(productOperationsReducer(operationInitialState, {
            type: ProductOperationType.UPDATE_PRODUCT_PENDING
        })).toMatchObject({
            loading: true,
            completed: false,
            error: ''
        })
    })

    it('should reset state on RESET_STATE', () => {
        const prevState = {
            ...operationInitialState,
            loading: true,
            completed: true
        }
        expect(productOperationsReducer(prevState, {
            type: ProductOperationType.RESET_STATE
        })).toMatchObject({
            ...operationInitialState
        })
    })

})