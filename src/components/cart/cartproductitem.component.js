import React from 'react'

const CartProductItem = ({ product }) => {
    return (
        <h3 key={product.id}>{`${product.name} x ${product.quantity}`}</h3>
    )
}

export default CartProductItem