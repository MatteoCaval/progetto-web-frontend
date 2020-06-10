import axios from "axios";
import Config from "../config";
import getAuthHeader from "./getAuthHeader";

const fetchOrders = (userToken) => {
    return axios.get(`${Config.API_BASE_URL}/user/orders`, getAuthHeader(userToken))
}

const fetchCart = (userToken) => {
    return axios.get(`${Config.API_BASE_URL}/user/cart`, getAuthHeader(userToken))
}

const addToCart = (productId, quantity, userToken) => {
    return axios.post(`${Config.API_BASE_URL}/user/cart`, { productId, quantity }, getAuthHeader(userToken))
}

const removeProductFromCart = (productId, userToken) => {
    return axios.delete(`${Config.API_BASE_URL}/user/cart/${productId}`, getAuthHeader(userToken))
}

const updateProductQuantity = (productId, quantity, userToken) => {
    return axios.put(`${Config.API_BASE_URL}/user/cart/${productId}`, { quantity: quantity }, getAuthHeader(userToken))
}

const fetchTodayTimetable = (userToken) => {
    return axios.get(`${Config.API_BASE_URL}/timetable/today`, getAuthHeader(userToken))
}

const fetchCurrentUser = (userToken) => {
    return axios.get(`${Config.API_BASE_URL}/user/current`, getAuthHeader(userToken))
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

