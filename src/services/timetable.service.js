import axios from "axios";
import Config from "../config";

const updateTimetable = (timetable, userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.put(`${Config.API_BASE_URL}/timetable`, { timetable })
}


const fetchTodayTimetable = (userToken) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
    return axios.get(`${Config.API_BASE_URL}/timetable/today`)
}


export const timetableService = {
    updateTimetable,
    fetchTodayTimetable
}

