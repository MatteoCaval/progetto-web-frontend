import CatalogActionType from "./catalog.types";
import { catalogService } from "../../services/catalog.service";

export const fetchCategories = () => {
    return (dispatch, getState) => {
        // if (getState().catalog.categories.length) return
        dispatch(fetchCategoriesPending())
        return catalogService.fetchCategories()
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
        return catalogService.fetchProductsForCategory(categoryId)
            .then(result => dispatch(fetchProductForCategorySuccess(result.data)))
            .catch(error => dispatch(fetchProductForCategoryFailed(error.message)))
    }
}


const fetchProductForCategorySuccess = (products) => {
    return {
        type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_SUCCESS,
        payload: products
    }
}

const fetchProductForCategoryFailed = (error) => {
    return {
        type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_FAILED,
        payload: error
    }
}

const fetchProductForCategoryPending = () => {
    return {
        type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_PENDING
    }
}

export const fetchProductDetail = (productId) => {
    return dispatch => {
        dispatch(fetchProductPending())
        return catalogService.fetchProductDetail(productId)
            .then(result => dispatch(fetchProductSuccess(result.data)))
            .catch(error => dispatch(fetchProductFailed(error.message)))
    }
}

const fetchProductSuccess = (product) => {
    return {
        type: CatalogActionType.FETCH_PRODUCT_SUCCESS,
        payload: product
    }
}

const fetchProductFailed = error => {
    return {
        type: CatalogActionType.FETCH_PRODUCT_FAILED,
        payload: error
    }
}

const fetchProductPending = () => {
    return {
        type: CatalogActionType.FETCH_PRODUCT_PENDING
    }
}

