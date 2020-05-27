import axios from "axios";
import Config from "../config";

const updateTimetable = (timetable) => {
    return axios.put(`${Config.API_BASE_URL}/timetable`, { timetable })
}

export const timetableService = {
    updateTimetable
}

