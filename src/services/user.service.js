import axios from "axios";
import Config from "../config";


const fetchOrders = (userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.get(`${Config.API_BASE_URL}/user/orders`)
}


export const userService = {
    fetchOrders
}

