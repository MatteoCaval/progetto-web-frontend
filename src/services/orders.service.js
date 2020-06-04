import axios from 'axios'
import Config from "../config";
import UserRoles from "../common/UserRoles";
import OrderState from "../common/OrderState";

const fetchOrderHistory = (token, userRole, page = 1, ) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const stateFilterQuery = userRole === UserRoles.ADMIN ? `&state=${OrderState.DELIVERED}` : ''
    return axios.get(`${Config.API_BASE_URL}/orders?page=${page}${stateFilterQuery}`)
}

export const orderService = {
    fetchOrderHistory
}