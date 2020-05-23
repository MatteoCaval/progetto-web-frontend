import React from "react";
import { connect } from "react-redux";
import ErrorSnackbar from "./error-snackbar.component";

const Alert = ({ alert }) => {

    return (
        alert && (alert.message ? (
            <ErrorSnackbar errorMessage={alert.message}/>
        ) : null)
    )

}

const mapStateToProps = state => {
    return {
        alert: state.alert
    }
}


export default connect(mapStateToProps)(Alert)