import axios from 'axios'
import Config from "../config";
import UserRoles from "../common/UserRoles";
import OrderState from "../common/OrderState";
import getAuthHeader from "./getAuthHeader";

const fetchOrderHistory = (token, userRole, page = 1, ) => {
    const stateFilterQuery = userRole === UserRoles.ADMIN ? `&state=${OrderState.DELIVERED}` : ''
    return axios.get(`${Config.API_BASE_URL}/orders?page=${page}${stateFilterQuery}`, getAuthHeader(token))
}

export const orderService = {
    fetchOrderHistory
}