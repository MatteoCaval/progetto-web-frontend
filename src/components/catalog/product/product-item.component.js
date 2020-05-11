import React from "react";

const ProductItem = ({ product }) => {

    return (
        <h2 key={product.id}>{product.name}</h2>
    )

}

export default ProductItem