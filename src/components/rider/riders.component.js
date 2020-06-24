import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchRiders } from "../../redux/admin/admin.actions";
import RiderItem from "./rider-item.component";
import { Button, Container, Grid } from "@material-ui/core";
import CreateRiderDialog from "./create-rider-dialog.component";
import Progress from "../common/progress.component";
import "./riders.style.scss"

const RidersPage = ({ riders, fetchRiders, loading }) => {

    const [creationDialogOpen, setCreationDialogOpen] = useState(false)

    useEffect(() => {
        fetchRiders()
    }, [fetchRiders])

    useEffect(() => {
        setCreationDialogOpen(false)
    }, [riders])

    return (
        <React.Fragment>
            <Container maxWidth='md'>
                <Grid container spacing={3}>
                    {riders ? riders.map(rider => <Grid key={rider.id} item xs={12}><RiderItem rider={rider}/></Grid>) :
                        <p>No riders found</p>}
                </Grid>
                <div className="rider-button-container">
                <Button
                    onClick={() => setCreationDialogOpen(true)}
                    variant="contained"
                    color="primary">
                    Create new rider
                </Button>
                </div>
            </Container>
            <CreateRiderDialog open={creationDialogOpen} onCreationCancelled={() => setCreationDialogOpen(false)}/>
            <Progress loading={loading}/>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const { riders, loading, riderCreation } = state.adminData
    return {
        riders,
        loading
    }
}

export default connect(mapStateToProps, { fetchRiders })(RidersPage)
