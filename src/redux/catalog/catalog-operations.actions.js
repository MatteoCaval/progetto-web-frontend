import CatalogOperationType from "./catalog-operations.type";
import { fetchProductsForCategory } from "./catalog.actions";
import { catalogService } from "../../services/catalog.service";

export const createProduct = (product) => {
    return (dispatch, getState) => {
        dispatch(createProductPending())
        const token = getState().user.token
        return catalogService.createProduct(product, token)
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
        return catalogService.updateProduct(updatedProduct, token)
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