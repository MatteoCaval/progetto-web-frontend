import axios from "axios";
import Config from "../config";

const fetchOrders = (userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.get(`${Config.API_BASE_URL}/user/orders`)
}

const fetchCart = (userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.get(`${Config.API_BASE_URL}/user/cart`)
}

const addToCart = (productId, quantity, userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.post(`${Config.API_BASE_URL}/user/cart`, { productId, quantity })
}

const removeProductFromCart = (productId, userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.delete(`${Config.API_BASE_URL}/user/cart/${productId}`)
}

const updateProductQuantity = (productId, quantity, userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.put(`${Config.API_BASE_URL}/user/cart/${productId}`, { quantity: quantity })
}

const fetchTodayTimetable = (userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.get(`${Config.API_BASE_URL}/timetable/today`)
}

const fetchCurrentUser = (userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.get(`${Config.API_BASE_URL}/user/current`)
}


export const userService = {
    fetchOrders,
    fetchCart,
    addToCart,
    removeProductFromCart,
    updateProductQuantity,
    fetchTodayTimetable,
    fetchCurrentUser
}

