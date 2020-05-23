import axios from "axios";
import Config from "../config";


const registerUser = (user) => {
    return axios.post(`${Config.API_BASE_URL}/auth/signup`, user)
}

const loginUser = (email, password) => {
    return axios.post(`${Config.API_BASE_URL}/auth/signin`, { email, password })
}

const logout = (token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    return axios.post(`${Config.API_BASE_URL}/auth/logout`)
}


export const authService = {
    registerUser,
    loginUser,
    logout
}