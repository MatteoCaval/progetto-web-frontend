import CatalogOperationType from "./catalog-operations.type";
import { fetchCategories, fetchProductsForCategory } from "./catalog.actions";
import { catalogService } from "../../services/catalog.service";

export const createProduct = (product) => {
    return (dispatch, getState) => {
        dispatch(createProductPending())
        const token = getState().user.data.token
        return catalogService.createProduct(product, token)
            .then(result => {
                dispatch(createProductSuccess(result.data))
            })
            .catch(error => dispatch(createProductFailed(error.message)))
    }
}

const createProductSuccess = (product) => {
    return {
        type: CatalogOperationType.CREATE_PRODUCT_SUCCESS,
        payload: product
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
        const token = getState().user.data.token
        return catalogService.updateProduct(updatedProduct, token)
            .then(result => {
                dispatch(updateProductSuccess(result.data))
            })
            .catch(error => dispatch(updateProductFailed(error.message)))
    }
}

const updateProductSuccess = (product) => {
    return {
        type: CatalogOperationType.UPDATE_PRODUCT_SUCCESS,
        payload: product
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

export const createCategory = (category) => {
    return (dispatch, getState) => {
        dispatch(createCategoryPending())
        const token = getState().user.data.token
        return catalogService.createCategory(category, token)
            .then(result => {
                dispatch(createCategorySuccess(result.data))
            })
            .catch(error => dispatch(createCategoryFailed(error.message)))
    }
}

const createCategorySuccess = (category) => {
    return {
        type: CatalogOperationType.CREATE_CATEGORY_SUCCESS,
        payload: category
    }
}

const createCategoryFailed = error => {
    return {
        type: CatalogOperationType.CREATE_CATEGORY_FAILED,
        payload: error
    }
}

const createCategoryPending = () => {
    return {
        type: CatalogOperationType.CREATE_CATEGORY_PENDING
    }
}

export const deleteCategory = (categoryId) => {
    return (dispatch, getState) => {
        dispatch(deleteCategoryPending())
        const token = getState().user.data.token
        return catalogService.deleteCategory(categoryId, token)
            .then(result => {
                dispatch(deleteCategorySuccess(categoryId))
            })
            .catch(error => dispatch(deleteCategoryFailed(error.message)))
    }
}

const deleteCategorySuccess = (categoryId) => {
    return {
        type: CatalogOperationType.REMOVE_CATEGORY_SUCCESS,
        payload: categoryId
    }
}

const deleteCategoryPending = () => {
    return {
        type: CatalogOperationType.REMOVE_CATEGORY_PENDING
    }
}

const deleteCategoryFailed = (errorMessage) => {
    return {
        type: CatalogOperationType.REMOVE_CATEGORY_FAILED,
        payload: errorMessage
    }
}


export const deleteProduct = (productId) => {
    return (dispatch, getState) => {
        dispatch(deleteProductPending())
        const token = getState().user.data.token
        return catalogService.deleteProduct(productId, token)
            .then(result => {
                dispatch(deleteProductSuccess(productId))
            })
            .catch(error => dispatch(deleteProductFailed(error.message)))
    }
}

const deleteProductSuccess = (productId) => {
    return {
        type: CatalogOperationType.REMOVE_PRODUCT_SUCCESS,
        payload: productId
    }
}

const deleteProductPending = () => {
    return {
        type: CatalogOperationType.REMOVE_PRODUCT_PENDING
    }
}

const deleteProductFailed = (errorMessage) => {
    return {
        type: CatalogOperationType.REMOVE_PRODUCT_FAILED,
        payload: errorMessage
    }
}

export const resetCatalogOperationsState = () => {
    return {
        type: CatalogOperationType.RESET_STATE
    }
}

