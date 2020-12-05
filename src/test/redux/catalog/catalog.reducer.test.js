import catalogReducer, {INITIAL_STATE as catalogInitialState} from "../../../redux/catalog/catalog.reducer";
import CatalogActionType from "../../../redux/catalog/catalog.types";
import CatalogOperationType from "../../../redux/catalog/catalog-operations.type";
import {sampleErrorResponse, sampleMappedError} from "../networkTestUtils";

describe('catalogReducer', () => {

    it('on FETCH_CATEGORIES_SUCCESS sets categories and clears loading and error', () => {
        const prevState = catalogInitialState

        const resultCategories = ['cat1', 'cat2']

        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_CATEGORIES_SUCCESS,
            payload: resultCategories
        })).toEqual({
            ...prevState,
            categories: resultCategories,
            error: null,
            loading: false
        })
    })

    it('on FETCH_CATEGORIES_FAILED sets error and clear loading', () => {
        const prevState = catalogInitialState
        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_CATEGORIES_FAILED,
            payload: sampleMappedError
        })).toEqual({
            ...prevState,
            categories: [],
            error: sampleMappedError,
            loading: false
        })
    })

    it('on FETCH_CATEGORIES_LOADING sets loading and clears error', () => {
        const prevState = catalogInitialState
        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_CATEGORIES_PENDING
        })).toEqual({
            ...prevState,
            categories: [],
            error: null,
            loading: true
        })
    })

    it('on FETCH_PRODUCT_SUCCESS sets result and clears loading and error', () => {
        const prevState = catalogInitialState
        const resultProduct = { name: 'prodotto' }
        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_PRODUCT_SUCCESS,
            payload: resultProduct
        })).toEqual({
            ...prevState,
            productDetails: resultProduct,
            error: null,
            loading: false
        })
    })

    it('on FETCH_PRODUCT_PENDING sets laoding and clear error and product', () => {
        const prevState = catalogInitialState
        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_PRODUCT_PENDING
        })).toEqual({
            ...prevState,
            productDetails: null,
            error: null,
            loading: true
        })
    })

    it('on FETCH_PRODUCT_FAILED sets error message and clears loading and product', () => {
        const prevState = catalogInitialState
        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_PRODUCT_FAILED,
            payload: sampleMappedError
        })).toEqual({
            ...prevState,
            productDetails: null,
            error: sampleMappedError,
            loading: false
        })
    })

    it('on FETCH_CATEGORY_PRODUCTS_SUCCESS sets products and clears loading and error', () => {
        const prevState = catalogInitialState
        const result = ['prod1', 'prod2']
        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_SUCCESS,
            payload: result
        })).toEqual({
            ...prevState,
            products: result,
            error: null,
            loading: false
        })
    })

    it('on FETCH_CATEGORY_PRODUCTS_PENDING sets loading and clears products and error', () => {
        const prevState = catalogInitialState
        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_PENDING
        })).toEqual({
            ...prevState,
            products: [],
            error: null,
            loading: true
        })
    })

    it('on FETCH_CATEGORY_PRODUCTS_ERROR sets errorMessage and clears products and loading', () => {
        const prevState = catalogInitialState
        const result = ['prod1', 'prod2']
        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_FAILED,
            payload: sampleMappedError
        })).toEqual({
            ...prevState,
            products: [],
            error: sampleMappedError,
            loading: false
        })
    })

    it('should delete category from state after REMOVE_CATEGORY_SUCCESS', () => {
        const categoryToRemove = {
            id: '1'
        }
        const prevState = {
            ...catalogInitialState,
            categories: [categoryToRemove]
        }
        expect(catalogReducer(prevState, {
            type: CatalogOperationType.REMOVE_CATEGORY_SUCCESS,
            payload: categoryToRemove.id
        })).toMatchObject({
            categories: []
        })
    })

    it('should delete product from state after REMOVE_PRODUCT_SUCCESS', () => {
        const productToRemove = {
            id: '1'
        }
        const prevState = {
            ...catalogInitialState,
            products: [productToRemove]
        }
        expect(catalogReducer(prevState, {
            type: CatalogOperationType.REMOVE_PRODUCT_SUCCESS,
            payload: productToRemove.id
        })).toMatchObject({
            products: []
        })
    })

    it('should contain created product inside state after CREATE_PRODUCT_SUCCESS', () => {
        const product = {
            id: 'id',
            name: 'prodotto da aggiungere'
        }

        const prevState = {
            ...catalogInitialState,
            products: []
        }

        expect(catalogReducer(prevState, {
            type: CatalogOperationType.CREATE_PRODUCT_SUCCESS,
            payload: product
        })).toMatchObject({
            products: [product]
        })

    })

    it('should contain updated product inside state after UPDATE_PRODUCT_SUCCESS', () => {
        const updatedProduct = {
            id: 'id1',
            name: 'nome aggiornato'
        }

        const prevState = {
            ...catalogInitialState,
            products: [
                {
                    id: 'id1',
                    name: 'nome precedente'
                }
            ]
        }

        expect(catalogReducer(prevState, {
            type: CatalogOperationType.UPDATE_PRODUCT_SUCCESS,
            payload: updatedProduct
        })).toMatchObject({
            products: [updatedProduct]
        })
    })


    it('should contain created category inside state after CREATE_CATEGORY_SUCCESS', () => {
        const category = {
            id: 'id1',
            name: 'nome categoria'
        }

        const prevState = {
            ...catalogInitialState,
        }

        expect(catalogReducer(prevState, {
            type: CatalogOperationType.CREATE_CATEGORY_SUCCESS,
            payload: category
        })).toMatchObject({
            categories: [category]
        })
    })


})