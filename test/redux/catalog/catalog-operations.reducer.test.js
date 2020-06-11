import catalogOperationsReducer, { INITIAL_STATE as operationInitialState } from "../../../src/redux/catalog/catalog-operations.reducer";
import CatalogOperationType from "../../../src/redux/catalog/catalog-operations.type";

describe('product operations reducer', () => {

    it('should set completed on CREATE_PRODUCT_SUCCESS', () => {
        expect(catalogOperationsReducer(operationInitialState, {
            type: CatalogOperationType.CREATE_PRODUCT_SUCCESS
        })).toMatchObject({
            loading: false,
            completed: true,
            error: ''
        })
    })

    it('should set completed on UPDATE_PRODUCT_SUCCESS', () => {
        expect(catalogOperationsReducer(operationInitialState, {
            type: CatalogOperationType.UPDATE_PRODUCT_SUCCESS
        })).toMatchObject({
            loading: false,
            completed: true,
            error: ''
        })
    })

    it('should set error on CREATE_PRODUCT_FAILED', () => {
        const errorMessage = 'error'
        expect(catalogOperationsReducer(operationInitialState, {
            type: CatalogOperationType.CREATE_PRODUCT_FAILED,
            payload: errorMessage
        })).toMatchObject({
            loading: false,
            completed: false,
            error: errorMessage
        })
    })

    it('should set error on UPDATE_PRODUCT_FAILED', () => {
        const errorMessage = 'error'
        expect(catalogOperationsReducer(operationInitialState, {
            type: CatalogOperationType.UPDATE_PRODUCT_FAILED,
            payload: errorMessage
        })).toMatchObject({
            loading: false,
            completed: false,
            error: errorMessage
        })
    })

    it('should set loading on CREATE_PRODUCT_PENDING', () => {
        expect(catalogOperationsReducer(operationInitialState, {
            type: CatalogOperationType.CREATE_PRODUCT_PENDING
        })).toMatchObject({
            loading: true,
            completed: false,
            error: ''
        })
    })

    it('should set loading on UPDATE_PRODUCT_PENDING', () => {
        expect(catalogOperationsReducer(operationInitialState, {
            type: CatalogOperationType.UPDATE_PRODUCT_PENDING
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
        expect(catalogOperationsReducer(prevState, {
            type: CatalogOperationType.RESET_STATE
        })).toMatchObject({
            ...operationInitialState
        })
    })

})