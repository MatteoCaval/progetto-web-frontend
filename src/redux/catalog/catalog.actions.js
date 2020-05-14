import CatalogActionType from "./catalog.types";
import axios from 'axios'
import Config from "../../config";

const products = [
    {
        id: 1,
        name: "Primo Prodotto",
        price: '6€',
        image: 'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2019/05/piadina-con-il-bimby/jcr:content/header-par/image-single.img10.jpg/1560520652683.jpg'
    },
    {
        id: 2,
        name: "Secondo Prodotto",
        price: '5€',
        image: 'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2019/05/piadina-con-il-bimby/jcr:content/header-par/image-single.img10.jpg/1560520652683.jpg'
    },
    {
        id: 3,
        name: "Terzo Prodotto",
        price: '4€',
        image: 'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2019/05/piadina-con-il-bimby/jcr:content/header-par/image-single.img10.jpg/1560520652683.jpg'
    }
]

export const fetchCategories = () => {
    return dispatch => {
        dispatch(fetchCategoriesPending())
        axios.get(`${Config.API_BASE_URL}/catalog/categories`)
            .then(result => dispatch(fetchCategoriesSuccess(result.data)))
            .catch(error => dispatch(fetchCategoriesFailed(error)))
    }
}

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: CatalogActionType.FETCH_CATEGORIES_SUCCESS,
        payload: categories
    }
}

export const fetchCategoriesFailed = (error) => {
    return {
        type: CatalogActionType.FETCH_CATEGORIES_FAILED,
        payload: error
    }
}

export const fetchCategoriesPending = () => {
    return {
        type: CatalogActionType.FETCH_CATEGORIES_PENDING
    }
}

export const fetchProductsForCategory = (categoryId) => {
    return {
        type: CatalogActionType.FETCH_PRODUCT_SUCCESS,
        payload: products
    }
}

export const fetchProduct = (productId) => {
    return dispatch => {
        dispatch(fetchProductPending())
        axios.get(`${Config.API_BASE_URL}/catalog/products/${productId}`)
            .then(result => dispatch(fetchProductSuccess(result.data)))
            .catch(error => dispatch(fetchProductFailed(error)))
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
        type: CatalogActionType.FETCH_CATEGORIES_PENDING
    }
}