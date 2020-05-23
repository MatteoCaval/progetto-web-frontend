import axios from 'axios'
import Config from "../config";

const fetchCategories = () => {
    return axios.get(`${Config.API_BASE_URL}/catalog/categories`)
}

const fetchProductsForCategory = (categoryId) => {
    return axios.get(`${Config.API_BASE_URL}/catalog/products?categoryId=${categoryId}`)
}

const fetchProductDetail = (productId) => {
    return axios.get(`${Config.API_BASE_URL}/catalog/products/${productId}`)
}


export const catalogService = {
    fetchCategories,
    fetchProductsForCategory,
    fetchProductDetail
}