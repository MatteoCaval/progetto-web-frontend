import React from "react";
import { connect } from "react-redux";

const AdminConstrained = ({ children, isAdmin }) => {
    return (isAdmin ? children : null)
}

const mapStateToProps = state => {
    return {
        isAdmin: state.user.currentUser && state.user.currentUser.role === 'admin'
    }
}

export default connect(mapStateToProps)(AdminConstrained)