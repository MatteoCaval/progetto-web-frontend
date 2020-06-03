import React from "react";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { alertActions } from "../../redux/alerts/alert.actions";
import Alert from "@material-ui/lab/Alert";
import AlertTypes from "../../redux/alerts/alert.types";

const AlertManager = ({ alert, clearAlerts }) => {

    const onCloseAlert = () => {
        clearAlerts()
    }

    return (
        alert && (alert.message ? (
            <Snackbar
                open={alert}
                autoHideDuration={2000}>
                <Alert
                    onClose={onCloseAlert}
                    severity={alert.type === AlertTypes.ERROR ? 'error' : 'info'}>
                    {alert.message}
                </Alert>
            </Snackbar>
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


export default connect(mapStateToProps, mapDispatchToProps)(AlertManager)