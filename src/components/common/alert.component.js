import React from "react";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { alertActions } from "../../redux/alerts/alert.actions";

const Alert = ({ alert, clearAlerts }) => {

    const onCloseAlert = () => {
        clearAlerts()
    }

    return (
        alert && (alert.message ? (
            <Snackbar
                open={alert}
                autoHideDuration={2000}
                message={alert.message}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onCloseAlert}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                }/>
        ) : null)
    )


}

const mapStateToProps = state => {
    return {
        alert: state.alert
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearAlerts: () => dispatch(alertActions.clear())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Alert)