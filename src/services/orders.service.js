import axios from 'axios'
import Config from "../config";

const fetchOrderHistory = (token, page = 1) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    return axios.get(`${Config.API_BASE_URL}/orders?page=${page}`)
}

export const orderService = {
    fetchOrderHistory
}