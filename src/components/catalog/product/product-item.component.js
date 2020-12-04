import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core";
import { addToCart } from "../../../redux/cart/cart.actions";
import { connect } from "react-redux";
import AddToCartIcon from "@material-ui/icons/AddShoppingCart"
import { withRouter } from "react-router-dom";
import "./product-item.style.scss";
import { ConsumerConstrained } from "../../common/constrained-containers.component";


const ProductItem = ({ product, addProductToCart, history, match }) => {

    const navigateToProductDetail = () => {
        history.push(`${match.url}/${product.id}`)
    }

    return (
        <Card className="product-item">
            <CardActionArea onClick={navigateToProductDetail}>
                <div className="image-container">
                    <CardMedia
                        className='media'
                        image={product.image}/>
                </div>
            </CardActionArea>
            <CardContent className="info">
                <Typography className="title" variant='h4' color='textPrimary'>
                    {product.name}
                </Typography>
                <div className='add-to-cart'>
                    <Typography variant='h5' color='textPrimary'>
                        {product.price && product.price.toFixed(2)}€
                    </Typography>

                    <ConsumerConstrained>
                        <IconButton
                            className="cart-button"
                            color='primary'
                            onClick={() => addProductToCart(product.id)}>
                            <AddToCartIcon/>
                        </IconButton>
                    </ConsumerConstrained>

                </div>

            </CardContent>
        </Card>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addProductToCart: product => dispatch(addToCart(product, 1))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(ProductItem))