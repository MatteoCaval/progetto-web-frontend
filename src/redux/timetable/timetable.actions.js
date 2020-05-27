import TimetableActions from "./timetable.actionTypes";
import { alertActions } from "../alerts/alert.actions";
import { timetableService } from "../../services/timetable.service";

export const updateTimetable = (timetable) => {
    return (dispatch, getState) => {
        dispatch(updateTimetablePending())
        timetableService.updateTimetable(timetable)
            .then(() => {
                dispatch(updateTimetableSuccess())
                dispatch(alertActions.success('Product added to cart'))
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