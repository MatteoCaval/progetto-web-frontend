import axios from "axios";
import Config from "../../config";
import CatalogOperationType from "./catalog-operations.type";
import { fetchProductsForCategory } from "./catalog.actions";
import getAuthHeader from "../../services/getAuthHeader";

export const createProduct = (product) => {
    return (dispatch, getState) => {
        dispatch(createProductPending())
        const token = getState().user.token
        return axios.post(`${Config.API_BASE_URL}/catalog/products`, product, getAuthHeader(token))
            .then(result => {
                dispatch(createProductSuccess())
                dispatch(fetchProductsForCategory(product.category_id, false))
            })
            .catch(error => dispatch(createProductFailed(error.message)))
    }
}

const createProductSuccess = () => {
    return {
        type: CatalogOperationType.CREATE_PRODUCT_SUCCESS
    }
}

const createProductFailed = error => {
    return {
        type: CatalogOperationType.CREATE_PRODUCT_FAILED,
        payload: error
    }
}

const createProductPending = () => {
    return {
        type: CatalogOperationType.CREATE_PRODUCT_PENDING
    }
}

export const updateProduct = (updatedProduct) => {
    return (dispatch, getState) => {
        dispatch(updateProductPending())
        const token = getState().user.token
        return axios.put(`${Config.API_BASE_URL}/catalog/products/${updatedProduct.productId}`, updatedProduct, getAuthHeader(token))
            .then(result => {
                dispatch(updateProductSuccess())
                dispatch(fetchProductsForCategory(updatedProduct.category_id, false))
            })
            .catch(error => dispatch(updateProductFailed(error.message)))
    }
}

const updateProductSuccess = () => {
    return {
        type: CatalogOperationType.UPDATE_PRODUCT_SUCCESS
    }
}

const updateProductFailed = error => {
    return {
        type: CatalogOperationType.UPDATE_PRODUCT_FAILED,
        payload: error
    }
}

const updateProductPending = () => {
    return {
        type: CatalogOperationType.UPDATE_PRODUCT_PENDING
    }
}

export const resetProductOperationsState = () => {
    return {
        type: CatalogOperationType.RESET_STATE
    }
}