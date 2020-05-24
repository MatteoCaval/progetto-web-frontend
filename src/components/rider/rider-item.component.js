import React from "react";
import { Card } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"

const RiderItem = ({ rider }) => {
    return (
        <Card>
            <CardHeader

                action={
                    <IconButton aria-label="settings">
                        <DeleteIcon/>
                    </IconButton>
                }
                title={`${rider.name} ${rider.surname}`}
                subheader={rider.email}
            />
        </Card>
    )
}

export default RiderItem