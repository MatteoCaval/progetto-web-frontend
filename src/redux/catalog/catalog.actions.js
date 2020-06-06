import CatalogActionType from "./catalog.types";
import { catalogService } from "../../services/catalog.service";

export const fetchCategories = () => {
    return (dispatch, getState) => {
        if (getState().catalog.categories.length) return
        dispatch(fetchCategoriesPending())
        catalogService.fetchCategories()
            .then(result => dispatch(fetchCategoriesSuccess(result.data)))
            .catch(error => dispatch(fetchCategoriesFailed(error.message)))
    }
}

const fetchCategoriesSuccess = (categories) => {
    return {
        type: CatalogActionType.FETCH_CATEGORIES_SUCCESS,
        payload: categories
    }
}

const fetchCategoriesFailed = (error) => {
    return {
        type: CatalogActionType.FETCH_CATEGORIES_FAILED,
        payload: error
    }
}

const fetchCategoriesPending = () => {
    return {
        type: CatalogActionType.FETCH_CATEGORIES_PENDING
    }
}

export const fetchProductsForCategory = (categoryId, cached = true) => {
    return (dispatch, getState) => {
        if (cached && getState().catalog.products.filter(product => product.categoryId === categoryId).length) return
        dispatch(fetchProductForCategoryPending())
        catalogService.fetchProductsForCategory(categoryId)
            .then(result => dispatch(fetchProductForCategorySuccess(result.data)))
            .catch(error => dispatch(fetchProductForCategoryFailed(error.message)))
    }
}


export const fetchProductForCategorySuccess = (products) => {
    return {
        type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_SUCCESS,
        payload: products
    }
}

export const fetchProductForCategoryFailed = (error) => {
    return {
        type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_FAILED,
        payload: error
    }
}

export const fetchProductForCategoryPending = () => {
    return {
        type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_PENDING
    }
}

export const fetchProductDetail = (productId) => {
    return dispatch => {
        dispatch(fetchProductPending())
        catalogService.fetchProductDetail(productId)
            .then(result => dispatch(fetchProductSuccess(result.data)))
            .catch(error => dispatch(fetchProductFailed(error.message)))
    }
}

export const fetchProductSuccess = (product) => {
    return {
        type: CatalogActionType.FETCH_PRODUCT_SUCCESS,
        payload: product
    }
}

export const fetchProductFailed = error => {
    return {
        type: CatalogActionType.FETCH_PRODUCT_FAILED,
        payload: error
    }
}

export const fetchProductPending = () => {
    return {
        type: CatalogActionType.FETCH_PRODUCT_PENDING
    }
}

