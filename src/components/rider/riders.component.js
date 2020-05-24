import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchRiders } from "../../redux/riders/admin.actions";
import RiderItem from "./rider-item.component";
import { Container, Grid } from "@material-ui/core";

const RidersPage = ({ riders, fetchRiders }) => {

    useEffect(() => {
        fetchRiders()
    }, [fetchRiders])

    return (
        <Container maxWidth='md'>
            <Grid container spacing={3}>
                {riders ? riders.map(rider => <Grid item xs={12}><RiderItem rider={rider}/></Grid>) :
                    <p>No riders found</p>}
            </Grid>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        riders: state.adminData.riders
    }
}

export default connect(mapStateToProps, { fetchRiders })(RidersPage)
