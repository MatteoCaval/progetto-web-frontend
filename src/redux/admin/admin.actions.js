import AdminActionType from "./admin.types";
import { adminService } from "../../services/admin-operation.service";
import { alertActions } from "../alerts/alert.actions";

export const fetchRiders = () => {
    return dispatch => {
        dispatch(fetchRidersPending())
        adminService.fetchRiders()
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
        const token = getState().user.currentUser.token
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
        const token = getState().user.currentUser.token
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