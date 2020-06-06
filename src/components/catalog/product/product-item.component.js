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
        <Card>
            <CardActionArea onClick={navigateToProductDetail}>
                <div className="product-image-container">
                    <CardMedia
                        className='product-media'
                        image={product.image}/>
                </div>
            </CardActionArea>
            <CardContent>
                <Typography className="product-title" variant='h3' color='textPrimary'>
                    {product.name}
                </Typography>
                <div className='product-root'>
                    <Typography variant='h3' color='textPrimary'>
                        {product.price}€
                    </Typography>

                    <ConsumerConstrained>
                        <IconButton
                            className="product-details"
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