import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {fetchRiders} from "../../redux/admin/admin.actions";
import RiderItem from "./rider-item.component";
import {Button, Container, Grid, Typography} from "@material-ui/core";
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
                <Typography variant="h1" className="page-title">Riders</Typography>
                <Grid container spacing={3}>
                    {
                        riders ? riders.map(rider => <Grid key={rider.id} item xs={12}><RiderItem
                            rider={rider}/></Grid>) : null
                    }
                </Grid>
                {
                    riders &&
                    (
                        <div className="rider-button-container">
                            <Button
                                onClick={() => setCreationDialogOpen(true)}
                                variant="contained"
                                color="primary">
                                Create new rider
                            </Button>
                        </div>
                    )
                }
            </Container>
            <CreateRiderDialog open={creationDialogOpen} onCreationCancelled={() => setCreationDialogOpen(false)}/>
            <Progress loading={loading}/>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const { riders, loading } = state.adminData
    return {
        riders,
        loading
    }
}

export default connect(mapStateToProps, { fetchRiders })(RidersPage)
