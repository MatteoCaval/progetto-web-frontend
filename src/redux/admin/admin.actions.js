import AdminActionType from "./admin.types";
import { adminService } from "../../services/admin-operation.service";
import { alertActions } from "../alerts/alert.actions";

export const fetchRiders = () => {
    return (dispatch, getState) => {
        dispatch(fetchRidersPending())
        const token = getState().user.token
        adminService.fetchRiders(token)
            .then(response => {
                dispatch(fetchRidersSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchRidersFailed(error.message))
                dispatch(alertActions.error('Error retrieving admin'))
            })
    }
}

export const fetchRidersSuccess = (riders) => {
    return {
        type: AdminActionType.FETCH_RIDERS_SUCCESS,
        payload: riders
    }
}

export const fetchRidersFailed = (errorMessage) => {
    return {
        type: AdminActionType.FETCH_RIDERS_FAILED,
        payload: errorMessage
    }
}

export const fetchRidersPending = () => {
    return {
        type: AdminActionType.FETCH_RIDERS_PENDING
    }
}

export const deleteRider = (riderId) => {
    return (dispatch, getState) => {
        dispatch(deleteRiderPending())
        const token = getState().user.token
        adminService.deleteRider(riderId, token)
            .then(result => {
                dispatch(deleteRiderSuccess(riderId))
                dispatch(alertActions.success('Rider removed'))
            })
            .catch(error => {
                dispatch(deleteRiderFailed(error.message))
                dispatch(alertActions.error(error.message))
            })

    }
}

export const deleteRiderPending = () => {
    return {
        type: AdminActionType.DELETE_RIDER_PENDING
    }
}

export const deleteRiderFailed = (errorMessage) => {
    return {
        type: AdminActionType.DELETE_RIDER_FAILED,
        payload: errorMessage
    }
}

export const deleteRiderSuccess = (id) => {
    return {
        type: AdminActionType.DELETE_RIDER_SUCCESS,
        payload: id
    }
}

export const createRider = (rider) => {
    return (dispatch, getState) => {
        dispatch(createRiderPending())
        const token = getState().user.token
        adminService.createRider(rider, token)
            .then(result => {
                dispatch(createRiderSuccess())
                dispatch(alertActions.success('Rider created'))
                dispatch(fetchRiders())
            })
            .catch(error => {
                dispatch(createRiderFailed(error.message))
                dispatch(alertActions.error(error.message))
            })
    }
}

export const createRiderSuccess = () => {
    return {
        type: AdminActionType.CREATE_RIDER_SUCCESS
    }
}

export const createRiderPending = () => {
    return {
        type: AdminActionType.CREATE_RIDER_PENDING
    }
}
export const createRiderFailed = (errorMessage) => {
    return {
        type: AdminActionType.CREATE_RIDER_FAILED,
        payload: errorMessage
    }
}

export const updateTimetable = (timetable) => {
    return (dispatch, getState) => {
        dispatch(updateTimetablePending())
        const token = getState().user.token
        adminService.updateTimetable(timetable, token)
            .then(() => {
                dispatch(updateTimetableSuccess())
                dispatch(alertActions.success('Timetable updated'))
            })
            .catch(error => dispatch(updateTimetableFailed(error.message)))

    }
}

export const updateTimetableSuccess = () => {
    return {
        type: AdminActionType.UPDATE_TIMETABLE_SUCCESS
    }
}
export const updateTimetableFailed = (error) => {
    return {
        type: AdminActionType.UPDATE_TIMETABLE_FAILED,
        payload: error
    }
}

export const updateTimetablePending = () => {
    return {
        type: AdminActionType.UPDATE_TIMETABLE_PENDING
    }
}

export const fetchTimetable = () => {
    return (dispatch, getState) => {
        dispatch(fetchTimetablePending())
        const token = getState().user.token
        adminService.fetchTimetable(token)
            .then((result) => {
                dispatch(fetchTimetableSuccess(result))
            })
            .catch(error => dispatch(fetchTimetableFailed(error.message)))

    }
}

export const fetchTimetableSuccess = (timetable) => {
    return {
        type: AdminActionType.FETCH_TIMETABLE_SUCCESS,
        payload: timetable
    }
}

export const fetchTimetableFailed = (error) => {
    return {
        type: AdminActionType.FETCH_TIMETABLE_FAILED,
        payload: error
    }
}

export const fetchTimetablePending = () => {
    return {
        type: AdminActionType.FETCH_TIMETABLE_PENDING
    }
}


