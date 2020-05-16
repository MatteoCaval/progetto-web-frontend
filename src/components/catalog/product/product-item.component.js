import React, { useEffect } from "react";
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core";
import { addToCart } from "../../../redux/cart/cart.actions";
import { connect } from "react-redux";
import AddToCartIcon from "@material-ui/icons/AddShoppingCart"
import { withRouter } from "react-router-dom";
import "./product-item.style.scss";


const ProductItem = ({ product, addProductToCart, history, match }) => {

    const navigateToProductDetail = () => {
        history.push(`${match.url}/${product.id}`)
    }

    return (
        <Card>
            <CardActionArea onClick={navigateToProductDetail}>
                <CardMedia
                    className='product-media'
                    image={product.image}
                />

                <CardContent>
                    <Typography className="product-title" variant='h5' color='textPrimary'>
                        {product.name}
                    </Typography>
                    <div className='product-root'>
                        <Typography variant='h6' color='textPrimary'>
                            {product.price}€
                        </Typography>

                        <IconButton
                            className="product-details"
                            color='primary'
                            onClick={() => addProductToCart(product)}>
                            <AddToCartIcon />
                        </IconButton>
                    </div>

                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addProductToCart: product => dispatch(addToCart(product))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(ProductItem))