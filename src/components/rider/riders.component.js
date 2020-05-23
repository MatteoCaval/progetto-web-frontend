import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchRiders } from "../../redux/riders/admin.actions";
import RiderItem from "./rider-item.component";

const RidersPage = ({ riders, fetchRiders }) => {

    useEffect(() => {
        fetchRiders()
    }, [fetchRiders])

    return (
        riders ? riders.map(rider => <RiderItem/>) : <p>No riders found</p>
    )
}

const mapStateToProps = state => {
    return {
        riders: state.adminData.riders
    }
}

export default connect(mapStateToProps, { fetchRiders })(RidersPage)
