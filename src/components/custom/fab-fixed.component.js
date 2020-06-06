import React from "react";
import { Fab, makeStyles } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    fabAdd: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}))

const FabFixed = ({ icon, to }) => {

    const classes = useStyles()

    return (
        <Fab className={classes.fabAdd}
            color="primary"
            component={RouterLink}
            to={to}>
            {icon}
        </Fab>
    );
}

export default FabFixed;
