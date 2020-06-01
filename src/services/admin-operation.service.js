import axios from "axios";
import Config from "../config";

const fetchRiders = (token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    return axios.get(`${Config.API_BASE_URL}/riders`)
}

const deleteRider = (riderId, token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    return axios.delete(`${Config.API_BASE_URL}/riders/${riderId}`)
}

const createRider = (rider, token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    return axios.post(`${Config.API_BASE_URL}/riders`, rider)
}

const fetchTimetable = (userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.get(`${Config.API_BASE_URL}/timetable/`)
}
const updateTimetable = (timetable, userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.put(`${Config.API_BASE_URL}/timetable`, { timetable })
}


export const adminService = {
    fetchRiders,
    deleteRider,
    createRider,
    fetchTimetable,
    updateTimetable
}