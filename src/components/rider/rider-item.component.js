import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const RiderItem = ({ rider }) => {
    return (
        <Card>
            <CardContent>
                <Typography color='textPrimary'>{`${rider.name} ${rider.surname}`}</Typography>
                <Typography color='textPrimary'>{rider.email}</Typography>
            </CardContent>
        </Card>
    )
}

export default RiderItem