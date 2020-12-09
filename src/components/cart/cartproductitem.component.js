import React from 'react'
import { Card, CardMedia, Typography, IconButton } from '@material-ui/core'

import "./cartproductitem.style.scss"
import QuantityPicker from "./../custom/quantity-picker.component"
import DeleteIcon from "@material-ui/icons/Delete"
import { removeProductFromCart, updateCartProductQuantity } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";


const CartProductItem = ({ product, removeFromCart, updateProductQuantity }) => {

    return (
        <Card className='cart-root'>
            <div className="cart-image-container">
                <CardMedia
                    className="cart-media"
                    image={product.image}/>
            </div>
            <div className="cart-row-container">
                <div className="cart-info">
                    <Typography className='cart-title' variant='h3' color='textPrimary'>
                        {product.name}
                    </Typography>
                    <Typography className='cart-price' variant='h4' color='textPrimary'>
                        {product.price.toFixed(2)}€
                    </Typography>
                </div>
                <div className="cart-actions">
                    <IconButton
                        color="primary"
                        onClick={() => removeFromCart(product.id)}>
                        <DeleteIcon/>
                    </IconButton>
                    <div className="cart-picker">
                        <QuantityPicker
                            quantity={product.quantity}
                            onQuantityIncremented={() => updateProductQuantity(product.id, product.quantity + 1)}
                            onQuantityDecremented={() => updateProductQuantity(product.id, product.quantity - 1)}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: productId => dispatch(removeProductFromCart(productId)),
        updateProductQuantity: (productId, quantity) => dispatch(updateCartProductQuantity(productId, quantity))
    }
}

export default connect(null, mapDispatchToProps)(CartProductItem)