import React from "react";
import { withRouter } from "react-router-dom";
import "./category-item.style.scss";

import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
    Container
} from "@material-ui/core";

const Category = ({ category, history, match }) => {
    return (
        <Card
        className='category-card'
        onClick={() => history.push(`${match.url}${category.id}`)}>
            <CardActionArea>
                <CardMedia
                    className='media'
                    image={category.image}
                    xs={6} sm={2}
                />
                <CardContent
                    className='content'
                    xs={6} sm={2}>
                    <Typography className='category-title' variant='h6' color='textPrimary'>
                        {category.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withRouter(Category)