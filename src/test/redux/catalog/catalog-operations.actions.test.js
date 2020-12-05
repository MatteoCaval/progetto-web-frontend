import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import {
    createCategory,
    createProduct,
    resetCatalogOperationsState,
    updateProduct
} from "../../../redux/catalog/catalog-operations.actions";
import CatalogOperationType from "../../../redux/catalog/catalog-operations.type";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('axios');

describe('product operation actions', () => {

    it('should create pending and success actions and fetching products on createProduct success', () => {

        const product = {
            name: 'nome',
            category_id: 'id'
        }

        const productsAfterCreation = [
            product
        ]

        const expectedActions = [
            { type: CatalogOperationType.CREATE_PRODUCT_PENDING },
            { type: CatalogOperationType.CREATE_PRODUCT_SUCCESS, payload: product }
        ]
        axios.post.mockImplementation(() => Promise.resolve({ data: product }))

        const store = mockStore({ user: { data: { token: 'token' } } })
        return store.dispatch(createProduct(product)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create pending and success actions and fetching products on updatedProduct success', () => {
        const product = {
            name: 'nome',
            category_id: 'id'
        }
        const productAfterUpdate = [
            product
        ]
        const expectedActions = [
            { type: CatalogOperationType.UPDATE_PRODUCT_PENDING },
            { type: CatalogOperationType.UPDATE_PRODUCT_SUCCESS, payload: productAfterUpdate }
        ]
        axios.put.mockImplementation(() => Promise.resolve({ data: productAfterUpdate }))

        const store = mockStore({ user: { data: { token: 'token' } } })
        return store.dispatch(updateProduct(product)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should return reset action on resetProductOperationsState success', () => {
        expect(resetCatalogOperationsState()).toEqual({
            type: CatalogOperationType.RESET_STATE
        })
    })


    it('should create pending and success actions and fetching categories on createCategory success', () => {
        const category = {
            name: 'nome',
        }

        const categoriesAfterCreation = [
            category
        ]

        const expectedActions = [
            { type: CatalogOperationType.CREATE_CATEGORY_PENDING },
            { type: CatalogOperationType.CREATE_CATEGORY_SUCCESS, payload: category }
        ]
        axios.post.mockImplementation(() => Promise.resolve({ data: category }))

        const store = mockStore({ user: { data: { token: 'token' } } })
        return store.dispatch(createCategory(category)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})