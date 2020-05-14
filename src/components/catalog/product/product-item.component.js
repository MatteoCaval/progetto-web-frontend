import React from "react";
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
import { addToCart } from "../../../redux/cart/cart.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

const ProductItem = ({ product, addProductToCart, history, match }) => {
    const classes = useStyles();

    const navigateToProductDetail = () => {
        history.push(`${match.url}/${product._id}`)
    }

    return (
        <Card>
            <CardActionArea onClick={navigateToProductDetail}>
                <CardMedia
                    className={classes.media}
                    image={product.image}
                />
                <CardContent>
                    <Typography variant='h6' color='textPrimary'>
                        {product.name}
                    </Typography>
                    <Typography color='textPrimary'>
                        {product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size='small'
                    color='primary'
                    onClick={() => addProductToCart(product)}
                >
                    Add to cart
                </Button>
            </CardActions>

        </Card>
    )

}

const mapDispatchToProps = dispatch => {
    return {
        addProductToCart: product => dispatch(addToCart(product))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(ProductItem))