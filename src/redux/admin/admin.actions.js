import AdminActionType from "./admin.types";
import { adminService } from "../../services/admin-operation.service";
import { alertActions } from "../alerts/alert.actions";

export const fetchRiders = () => {
    return (dispatch, getState) => {
        dispatch(fetchRidersPending())
        const token = getState().user.data.token
        return adminService.fetchRiders(token)
            .then(response => {
                dispatch(fetchRidersSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchRidersFailed(error.message))
            })
    }
}

const fetchRidersSuccess = (riders) => {
    return {
        type: AdminActionType.FETCH_RIDERS_SUCCESS,
        payload: riders
    }
}

const fetchRidersFailed = (errorMessage) => {
    return {
        type: AdminActionType.FETCH_RIDERS_FAILED,
        payload: errorMessage
    }
}

const fetchRidersPending = () => {
    return {
        type: AdminActionType.FETCH_RIDERS_PENDING
    }
}

export const deleteRider = (riderId) => {
    return (dispatch, getState) => {
        dispatch(deleteRiderPending())
        const token = getState().user.data.token
        return adminService.deleteRider(riderId, token)
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

const deleteRiderPending = () => {
    return {
        type: AdminActionType.DELETE_RIDER_PENDING
    }
}

const deleteRiderFailed = (errorMessage) => {
    return {
        type: AdminActionType.DELETE_RIDER_FAILED,
        payload: errorMessage
    }
}

const deleteRiderSuccess = (id) => {
    return {
        type: AdminActionType.DELETE_RIDER_SUCCESS,
        payload: id
    }
}

export const createRider = (rider) => {
    return (dispatch, getState) => {
        dispatch(createRiderPending())
        const token = getState().user.data.token
        return adminService.createRider(rider, token)
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

const createRiderSuccess = () => {
    return {
        type: AdminActionType.CREATE_RIDER_SUCCESS
    }
}

const createRiderPending = () => {
    return {
        type: AdminActionType.CREATE_RIDER_PENDING
    }
}
const createRiderFailed = (errorMessage) => {
    return {
        type: AdminActionType.CREATE_RIDER_FAILED,
        payload: errorMessage
    }
}

export const updateTimetable = (timetable) => {
    return (dispatch, getState) => {
        dispatch(updateTimetablePending())
        const token = getState().user.data.token
        return adminService.updateTimetable(timetable, token)
            .then(() => {
                dispatch(updateTimetableSuccess())
                dispatch(alertActions.success('Timetable updated'))
            })
            .catch(error => {
                dispatch(updateTimetableFailed(error.message))
                dispatch(alertActions.error('Error fetching timetable'))
            })

    }
}

const updateTimetableSuccess = () => {
    return {
        type: AdminActionType.UPDATE_TIMETABLE_SUCCESS
    }
}
const updateTimetableFailed = (error) => {
    return {
        type: AdminActionType.UPDATE_TIMETABLE_FAILED,
        payload: error
    }
}

const updateTimetablePending = () => {
    return {
        type: AdminActionType.UPDATE_TIMETABLE_PENDING
    }
}

export const fetchTimetable = () => {
    return (dispatch, getState) => {
        dispatch(fetchTimetablePending())
        const token = getState().user.data.token
        return adminService.fetchTimetable(token)
            .then((result) => {
                dispatch(fetchTimetableSuccess(result.data))
            })
            .catch(error => dispatch(fetchTimetableFailed(error.message)))

    }
}

const fetchTimetableSuccess = (timetable) => {
    return {
        type: AdminActionType.FETCH_TIMETABLE_SUCCESS,
        payload: timetable
    }
}

const fetchTimetableFailed = (error) => {
    return {
        type: AdminActionType.FETCH_TIMETABLE_FAILED,
        payload: error
    }
}

const fetchTimetablePending = () => {
    return {
        type: AdminActionType.FETCH_TIMETABLE_PENDING
    }
}


