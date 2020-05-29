import TimetableActions from "./timetable.actionTypes";
import { alertActions } from "../alerts/alert.actions";
import { timetableService } from "../../services/timetable.service";

export const updateTimetable = (timetable) => {
    return (dispatch, getState) => {
        dispatch(updateTimetablePending())
        const token = getState().user.currentUser.token
        timetableService.updateTimetable(timetable, token)
            .then(() => {
                dispatch(updateTimetableSuccess())
                dispatch(alertActions.success('Timetable updated'))
            })
            .catch(error => dispatch(updateTimetableFailed(error.message)))

    }
}

export const updateTimetableSuccess = () => {
    return {
        type: TimetableActions.UPDATE_TIMETABLE_SUCCESS
    }
}
export const updateTimetableFailed = (error) => {
    return {
        type: TimetableActions.UPDATE_TIMETABLE_FAILED,
        payload: error
    }
}

export const updateTimetablePending = () => {
    return {
        type: TimetableActions.UPDATE_TIMETABLE_PENDING
    }
}

export const fetchTodayTimetable = (timetable) => {
    return (dispatch, getState) => {
        dispatch(fetchTodayTimetablePending())
        const token = getState().user.currentUser.token
        timetableService.fetchTodayTimetable(token)
            .then(result  => {
                dispatch(fetchTodayTimetableSuccess(result))
            })
            .catch(error => dispatch(fetchTodayTimetableFailed(error.message)))
    }
}


export const fetchTodayTimetableSuccess = (timetable) => {
    return {
        type: TimetableActions.FETCH_TODAY_TIMETABLE_SUCCESS,
        payload: timetable
    }
}

export const fetchTodayTimetableFailed = (error) => {
    return {
        type: TimetableActions.FETCH_TODAY_TIMETABLE_FAILED,
        payload: error
    }
}

export const fetchTodayTimetablePending = () => {
    return {
        type: TimetableActions.FETCH_TODAY_TIMETABLE_PENDING
    }
}