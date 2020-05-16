import React from "react";
import { withRouter } from "react-router-dom";
import "./category-item.style.scss";

import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";

const Category = ({ category, history, match }) => {
    return (
        <Card
        className='category-card'
        onClick={() => history.push(`${match.url}${category.id}`)}>
            <CardActionArea>
                <CardMedia
                    className='category-media'
                    image={category.image}
                />
                <CardContent
                    className='content'>
                    <Typography className='category-title' variant='h6' color='textPrimary'>
                        {category.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withRouter(Category)