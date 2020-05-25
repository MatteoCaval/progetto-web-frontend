import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchRiders } from "../../redux/riders/admin.actions";
import RiderItem from "./rider-item.component";
import { Button, Container, Grid } from "@material-ui/core";
import CreateRiderDialog from "./create-rider-dialog.component";

const RidersPage = ({ riders, fetchRiders }) => {

    useEffect(() => {
        fetchRiders()
    }, [fetchRiders])

    return (
        <React.Fragment>
            <Container maxWidth='md'>
                <Grid container spacing={3}>
                    {riders ? riders.map(rider => <Grid item xs={12}><RiderItem rider={rider}/></Grid>) :
                        <p>No riders found</p>}
                </Grid>
                <Button
                    variant="contained"
                    color="primary">
                    Create new rider
                </Button>
            </Container>
            <CreateRiderDialog />
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        riders: state.adminData.riders
    }
}

export default connect(mapStateToProps, { fetchRiders })(RidersPage)
