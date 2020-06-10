import axios from "axios";
import Config from "../config";
import getAuthHeader from "./getAuthHeader";

const fetchRiders = (token) => {
    return axios.get(`${Config.API_BASE_URL}/riders`, getAuthHeader(token))
}

const deleteRider = (riderId, token) => {
    return axios.delete(`${Config.API_BASE_URL}/riders/${riderId}`, getAuthHeader(token))
}

const createRider = (rider, token) => {
    return axios.post(`${Config.API_BASE_URL}/riders`, rider, getAuthHeader(token))
}

const fetchTimetable = (userToken) => {
    return axios.get(`${Config.API_BASE_URL}/timetable/`, getAuthHeader(userToken))
}
const updateTimetable = (timetable, userToken) => {
    return axios.put(`${Config.API_BASE_URL}/timetable`, { timetable }, getAuthHeader(userToken))
}


export const adminService = {
    fetchRiders,
    deleteRider,
    createRider,
    fetchTimetable,
    updateTimetable
}