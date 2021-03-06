import {connect} from "react-redux";

const RoleConstrained = ({ children, roleMatch }) => {
    return (roleMatch ? children : null)
}

const mapStateToProps = (state, ownProps) => {
    return {
        roleMatch: ownProps.role && state.user && state.user.data && state.user.data.role === ownProps.role
    }
}

export default connect(mapStateToProps)(RoleConstrained)

