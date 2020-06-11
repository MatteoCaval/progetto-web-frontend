import axios from 'axios'
import Config from "../config";
import getAuthHeader from "./getAuthHeader";

const fetchCategories = () => {
    return axios.get(`${Config.API_BASE_URL}/catalog/categories`)
}

const fetchProductsForCategory = (categoryId) => {
    return axios.get(`${Config.API_BASE_URL}/catalog/products?categoryId=${categoryId}`)
}

const fetchProductDetail = (productId) => {
    return axios.get(`${Config.API_BASE_URL}/catalog/products/${productId}`)
}

const createCategory = (category, token) => {
    return axios.post(`${Config.API_BASE_URL}/catalog/categories`,
        category,
        getAuthHeader(token))
}

const createProduct = (product, token) => {
    return axios.post(`${Config.API_BASE_URL}/catalog/products`,
        product,
        getAuthHeader(token))
}

const updateProduct = (updatedProduct, token) => {
    return axios.put(
        `${Config.API_BASE_URL}/catalog/products/${updatedProduct.productId}`,
        updatedProduct,
        getAuthHeader(token))
}

const deleteProduct = (productId, token) => {
    return axios.delete(
        `${Config.API_BASE_URL}/catalog/products/${productId}`,
        getAuthHeader(token))
}

const deleteCategory = (categoryId, token) => {
    return axios.delete(
        `${Config.API_BASE_URL}/catalog/categories/${categoryId}`,
        getAuthHeader(token))
}

export const catalogService = {
    fetchCategories,
    fetchProductsForCategory,
    fetchProductDetail,
    createProduct,
    updateProduct,
    createCategory,
    deleteProduct,
    deleteCategory
}