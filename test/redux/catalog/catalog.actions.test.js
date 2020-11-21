import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import CatalogActionType from "../../../src/redux/catalog/catalog.types";
import axios from 'axios'
import {
    fetchCategories,
    fetchProductDetail,
    fetchProductsForCategory
} from "../../../src/redux/catalog/catalog.actions";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('axios');

describe('async catalog actions', () => {

    const errorCode = 404
    const errorDescription = 'description'

    const sampleErrorResponse = {
        response: {
            code: errorCode,
            data: {
                description: errorDescription
            }
        }
    }

    it('fetchingCategories on success creates PENDING and SUCCESS actions', () => {
        const expectedActions = [
            { type: CatalogActionType.FETCH_CATEGORIES_PENDING },
            { type: CatalogActionType.FETCH_CATEGORIES_SUCCESS, payload: [] }
        ]
        const store = mockStore({ catalog: { categories: [] } })

        axios.get.mockImplementation(() => Promise.resolve({ data: [] }))

        return store.dispatch(fetchCategories()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('fetchingCategories on error creates PENDING and ERROR actions', () => {
        const sampleError = {
            code: errorCode,
            description: errorDescription
        }

        const expectedActions = [
            { type: CatalogActionType.FETCH_CATEGORIES_PENDING },
            { type: CatalogActionType.FETCH_CATEGORIES_FAILED, payload: sampleError }
        ]
        const store = mockStore({ catalog: { categories: [] } })

        axios.get.mockImplementation(() => Promise.reject(sampleErrorResponse))

        return store.dispatch(fetchCategories()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('fetchProductsForCategory return PENDING and SUCCESS state actions', () => {
        const categoryId = 'id'

        const expectedActions = [
            { type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_PENDING },
            { type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_SUCCESS, payload: [] },
        ]

        const store = mockStore({
            catalog: {
                products: [
                    {
                        categoryId: categoryId
                    }
                ]
            }
        })

        axios.get.mockImplementation(() => Promise.resolve({ data: [] }))

        return store.dispatch(fetchProductsForCategory(categoryId, false))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })


    it('fetchProducts details return PENDING and SUCCESS state actions', () => {
        const productId = 'id'
        const productDetails = {}

        const expectedActions = [
            { type: CatalogActionType.FETCH_PRODUCT_PENDING },
            { type: CatalogActionType.FETCH_PRODUCT_SUCCESS, payload: productDetails },
        ]

        const store = mockStore({
            catalog: {}
        })

        axios.get.mockImplementation(() => Promise.resolve({ data: productDetails }))

        return store.dispatch(fetchProductDetail(productId))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })


})
