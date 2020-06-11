import React, { useEffect, useState } from "react";

import "./product-page.style.scss";

import { Button, CardMedia, Grid, Typography } from "@material-ui/core";
import { fetchProductDetail } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";
import QuantityPicker from "./../../custom/quantity-picker.component"
import AddToCartIcon from "@material-ui/icons/AddShoppingCart"
import EditIcon from "@material-ui/icons/Edit"
import { addToCart } from "../../../redux/cart/cart.actions";
import { AdminConstrained, ConsumerConstrained } from "../../common/constrained-containers.component";
import FabFixed from "../../custom/fab-fixed.component"

const ProductPage = ({ match, fetchProduct, addToCart, product }) => {

    const productId = match.params.productId
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        fetchProduct(productId)
    }, [fetchProduct])

    return (
        product ? (
            <Grid container className='prod-details' spacing={2}>
                <Grid item xs={12} sm={6}>
                    <div className='center-container'>
                        <CardMedia
                            className='media'
                            image={product.image}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>

                    <div className='side-container'>
                        <Typography className='title' variant='h3' color='textPrimary'>
                            {product.name}
                        </Typography>
                        <Typography variant='h3' color='textPrimary'>
                            {product.price}€
                        </Typography>
                    </div>
                    <div className="info-container">
                        <p>{product.description}</p>
                        <div className="ingredients-container">
                            <Typography className='ingredients' variant='h3' color='textPrimary'>
                                Ingredienti:
                            </Typography>
                            <ul>
                                {
                                    product.ingredients.map((ingredient, index) =>
                                        <li key={index}>{ingredient}</li>
                                    )
                                }
                            </ul>
                        </div>
                        <ConsumerConstrained>
                            <div className='add-to-cart-container'>
                                <QuantityPicker
                                    quantity={quantity}
                                    onQuantityIncremented={() => setQuantity(quantity + 1)}
                                    onQuantityDecremented={() => setQuantity(quantity - 1)}/>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => addToCart(productId, quantity)}
                                    startIcon={<AddToCartIcon/>}
                                >Add to cart</Button>
                            </div>
                        </ConsumerConstrained>
                    </div>
                </Grid>
                <AdminConstrained>
                    <FabFixed icon={<EditIcon/>} to={`${productId}/edit`}/>
                </AdminConstrained>
            </Grid>) : null
    )
}

const mapStateToProps = state => {
    return {
        product: state.catalog.productDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: productId => dispatch(fetchProductDetail(productId)),
        addToCart: (productId, quantity) => dispatch(addToCart(productId, quantity))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)