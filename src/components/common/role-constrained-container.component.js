import React from "react";
import { connect } from "react-redux";

const RoleConstrained = ({ children, roleMatch }) => {
    return (roleMatch ? children : null)
}

const mapStateToProps = (state, ownProps) => {
    return {
        roleMatch: ownProps.role && state.user.currentUser && state.user.currentUser.role === ownProps.role
    }
}

export default connect(mapStateToProps)(RoleConstrained)
