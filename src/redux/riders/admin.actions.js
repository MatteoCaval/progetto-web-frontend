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
                dispatch(alertActions.error('Error retrieving riders'))
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
        type: AdminActionType.FETCH_RIDERS_FAILED
    }
}