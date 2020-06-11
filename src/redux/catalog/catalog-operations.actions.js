import CatalogOperationType from "./catalog-operations.type";
import { fetchCategories, fetchProductsForCategory } from "./catalog.actions";
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

export const createCategory = (category) => {
    return (dispatch, getState) => {
        dispatch(createCategoryPending())
        const token = getState().user.token
        return catalogService.createCategory(category, token)
            .then(result => {
                dispatch(createCategorySuccess())
                dispatch(fetchCategories())
            })
            .catch(error => dispatch(createCategoryFailed(error.message)))
    }
}

const createCategorySuccess = () => {
    return {
        type: CatalogOperationType.CREATE_CATEGORY_SUCCESS
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
        const token = getState().user.token
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
        const token = getState().user.token
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

