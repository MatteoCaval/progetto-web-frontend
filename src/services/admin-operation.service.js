import axios from "axios";
import Config from "../config";

const fetchRiders = (token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    return axios.get(`${Config.API_BASE_URL}/riders`)
}

const deleteRider = (riderId, token) => {
    return new Promise(((resolve, reject) => {
        resolve()
    }))
}

const createRider = (rider, token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    return axios.post(`${Config.API_BASE_URL}/riders`, rider)
}


export const adminService = {
    fetchRiders,
    deleteRider,
    createRider
}