import React from "react";
import {makeStyles, Card, CardMedia, CardActionArea, CardContent, Typography, CardActions, Button } from "@material-ui/core";

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

const ProductItem = ({ product }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={product.image}
                />
                <CardContent>
                    <Typography variant='h6' color='textPrimary'>
                        {product.name}
                    </Typography>
                    <Typography variant='h7' color='textPrimary'>
                        {product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size='small' color='primary'>
                    Add to cart
                </Button>
            </CardActions>

        </Card>
    )

}

export default ProductItem