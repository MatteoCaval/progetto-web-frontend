import React from 'react'
import { Card, CardMedia, Typography, Button } from '@material-ui/core'

import "./cartproductitem.style.scss"
import QuantityPicker from "./../catalog/product/quantity-picker.component"

const onQuantityChanged = (quantity) => {
    console.log(quantity)
}

const CartProductItem = ({ product }) => {
    return (
        <Card className='cart-root'>
            <CardMedia
                className="cart-media"
                image={product.image} />
            <div className="cart-double-row">
                <div className="cart-info">
                    <Typography className='cart-title' variant='h5' color='textPrimary'>
                        {product.name}
                    </Typography>
                    <Typography className='cart-price' variant='h6' color='textPrimary'>
                        {product.price}€
                    </Typography>
                </div>
                <div className="cart-actions">
                    <Button
                        variant="contained"
                        color="primary">
                        Delete
                    </Button>
                    <div className="cart-picker">
                        <QuantityPicker  onValueChanged={onQuantityChanged} />
                    </div>
                </div>
            </div>


        </Card>
    )
}

export default CartProductItem