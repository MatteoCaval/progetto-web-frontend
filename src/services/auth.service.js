import axios from "axios";
import Config from "../config";
import getAuthHeader from "./getAuthHeader";


const registerUser = (user) => {
    return axios.post(`${Config.API_BASE_URL}/auth/signup`, user)
}

const loginUser = (email, password) => {
    return axios.post(`${Config.API_BASE_URL}/auth/signin`, { email, password })
}

const logout = (token) => {
    console.log(token)
    return axios.post(`${Config.API_BASE_URL}/auth/logout`, null, getAuthHeader(token))
}


export const authService = {
    registerUser,
    loginUser,
    logout
}