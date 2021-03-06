import React from 'react'
import { Container, Typography} from '@material-ui/core'

import "./order-product-item.style.scss"

const OrderProductItem = ({ product }) => {
    return (
        <Container className='order-product'>
            <Typography color='textPrimary'>
                {product.quantity} x {product.name}
            </Typography>

            <div className="price">
                <Typography color='textPrimary'>
                    {product.price.toFixed(2)}€
                </Typography>
            </div>
        </Container>
    )
}

export default OrderProductItem