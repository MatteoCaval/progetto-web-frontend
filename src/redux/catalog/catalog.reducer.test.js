import catalogReducer, { INITIAL_STATE as catalogInitialState } from "./catalog.reducer";
import CatalogActionType from "./catalog.types";

describe('catalogReducer', () => {

    const errorMessage = 'error'

    it('on FETCH_CATEGORIES_SUCCESS sets categories and clears loading and error', () => {
        const prevState = catalogInitialState

        const resultCategories = ['cat1', 'cat2']

        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_CATEGORIES_SUCCESS,
            payload: resultCategories
        })).toEqual({
            ...prevState,
            categories: resultCategories,
            error: '',
            loading: false
        })
    })

    it('on FETCH_CATEGORIES_FAILED sets error and clear loading', () => {
        const prevState = catalogInitialState
        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_CATEGORIES_FAILED,
            payload: 'error'
        })).toEqual({
            ...prevState,
            categories: [],
            error: 'error',
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
            error: '',
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
            error: '',
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
            error: '',
            loading: true
        })
    })

    it('on FETCH_PRODUCT_FAILED sets error message and clears loading and product', () => {
        const prevState = catalogInitialState
        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_PRODUCT_FAILED,
            payload: errorMessage
        })).toEqual({
            ...prevState,
            productDetails: null,
            error: errorMessage,
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
            error: '',
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
            error: '',
            loading: true
        })
    })

    it('on FETCH_CATEGORY_PRODUCTS_ERROR sets errorMessage and clears products and loading', () => {
        const prevState = catalogInitialState
        const result = ['prod1', 'prod2']
        expect(catalogReducer(prevState, {
            type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_FAILED,
            payload: errorMessage
        })).toEqual({
            ...prevState,
            products: [],
            error: errorMessage,
            loading: false
        })
    })


})