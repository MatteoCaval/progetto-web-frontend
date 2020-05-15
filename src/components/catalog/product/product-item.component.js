import React, { useEffect } from "react";
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core";
import { addToCart } from "../../../redux/cart/cart.actions";
import { connect } from "react-redux";
import AddToCartIcon from "@material-ui/icons/AddShoppingCart"
import { withRouter } from "react-router-dom";
import "./product-item.style.scss";


const ProductItem = ({ product, addProductToCart, history, match }) => {

    const navigateToProductDetail = () => {
        history.push(`${match.url}/${product._id}`)
    }

    useEffect(() => {
        // fare qua chiamata per dettaglio prodotto
    }, [])

    return (
        <Card>
            <CardActionArea onClick={navigateToProductDetail}>
                <CardMedia
                    className='media'
                    image={product.image}
                />

                <div className='root'>
                    <CardContent>
                        <Typography variant='h6' color='textPrimary'>
                            {product.name}
                        </Typography>
                        <Typography color='textPrimary'>
                            {product.price}€
                        </Typography>
                    </CardContent>

                    <div className="details">
                        <IconButton
                            color='primary'
                            onClick={() => addProductToCart(product)}>
                            <AddToCartIcon/>
                        </IconButton>
                    </div>
                </div>
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