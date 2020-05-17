import React from 'react'
import { Card, CardMedia, Typography, IconButton } from '@material-ui/core'

import "./cartproductitem.style.scss"
import QuantityPicker from "./../catalog/product/quantity-picker.component"
import DeleteIcon from "@material-ui/icons/Delete"
import { removeProductFromCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";


const onQuantityChanged = (quantity) => {
    console.log(quantity)
}

const CartProductItem = ({ product, removeFromCart }) => {
    return (
        <Card className='cart-root'>
            <CardMedia
                className="cart-media"
                image={product.image}/>
            <div className="cart-row-container">
                <div className="cart-info">
                    <Typography className='cart-title' variant='h5' color='textPrimary'>
                        {product.name}
                    </Typography>
                    <Typography className='cart-price' variant='h6' color='textPrimary'>
                        {product.price}€
                    </Typography>
                </div>
                <div className="cart-actions">
                    <IconButton
                        color="primary"
                        onClick={() => removeFromCart(product.id)}>
                        <DeleteIcon/>
                    </IconButton>
                    <div className="cart-picker">
                        <QuantityPicker quantity={product.quantity} onValueChanged={onQuantityChanged}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: productId => dispatch(removeProductFromCart(productId))
    }
}

export default connect(null, mapDispatchToProps)(CartProductItem)