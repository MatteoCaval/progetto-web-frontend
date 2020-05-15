import React from "react";
import { withRouter } from "react-router-dom";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

const Category = ({ category, history, match }) => {
    const classes = useStyles();

    return (
        <Card
        onClick={() => history.push(`${match.url}${category.name}`)}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={category.image}
                />
                <CardContent>
                    <Typography variant='h6' color='textPrimary'>
                        {category.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withRouter(Category)