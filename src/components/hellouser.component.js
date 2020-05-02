import React from "react";
import {connect} from "react-redux";

const HelloUser = ({currentUser}) => {
    return (
        <div>{currentUser}</div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(HelloUser)



