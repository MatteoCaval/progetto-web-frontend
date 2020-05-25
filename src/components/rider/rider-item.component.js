import React from "react";
import { Card } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"
import { deleteRider } from "../../redux/riders/admin.actions";
import { connect } from "react-redux";

const RiderItem = ({ rider, deleteRider }) => {
    return (
        <Card>
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={() => deleteRider(rider.id)}>
                        <DeleteIcon/>
                    </IconButton>
                }
                title={`${rider.name} ${rider.surname}`}
                subheader={rider.email}
            />
        </Card>
    )
}


export default connect(null, { deleteRider })(RiderItem)