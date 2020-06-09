import axios from "axios";
import Config from "../../../config";
import ProductOperationType from "./product-operations.type";
import { fetchProductsForCategory } from "../catalog.actions";

export const createProduct = (product) => {
    return dispatch => {
        dispatch(createProductPending())
        return axios.post(`${Config.API_BASE_URL}/catalog/products`, product)
            .then(result => {
                dispatch(createProductSuccess())
                dispatch(fetchProductsForCategory(product.category_id, false))
            })
            .catch(error => dispatch(createProductFailed(error.message)))
    }
}

const createProductSuccess = () => {
    return {
        type: ProductOperationType.CREATE_PRODUCT_SUCCESS
    }
}

const createProductFailed = error => {
    return {
        type: ProductOperationType.CREATE_PRODUCT_FAILED,
        payload: error
    }
}

const createProductPending = () => {
    return {
        type: ProductOperationType.CREATE_PRODUCT_PENDING
    }
}

export const updateProduct = (updatedProduct) => {
    return dispatch => {
        dispatch(updateProductPending())
        return axios.put(`${Config.API_BASE_URL}/catalog/products/${updatedProduct.productId}`, updatedProduct)
            .then(result => {
                dispatch(updateProductSuccess())
                dispatch(fetchProductsForCategory(updatedProduct.category_id, false))
            })
            .catch(error => dispatch(updateProductFailed(error.message)))
    }
}

const updateProductSuccess = () => {
    return {
        type: ProductOperationType.UPDATE_PRODUCT_SUCCESS
    }
}

const updateProductFailed = error => {
    return {
        type: ProductOperationType.UPDATE_PRODUCT_FAILED,
        payload: error
    }
}

const updateProductPending = () => {
    return {
        type: ProductOperationType.UPDATE_PRODUCT_PENDING
    }
}

export const resetProductOperationsState = () => {
    return {
        type: ProductOperationType.RESET_STATE
    }
}