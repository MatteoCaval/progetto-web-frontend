import React, { useEffect, useState } from "react";

import "./product-page.style.scss";

import { Button, CardMedia, Container, Fab, Typography } from "@material-ui/core";
import { fetchProductDetail } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";
import QuantityPicker from "./../../custom/quantity-picker.component"
import AddToCartIcon from "@material-ui/icons/AddShoppingCart"
import EditIcon from "@material-ui/icons/Edit"
import { addToCart } from "../../../redux/cart/cart.actions";
import { Link as RouterLink } from 'react-router-dom'
import { AdminConstrained, ConsumerConstrained } from "../../common/constrained-containers.component";


// const product =
// {
//     category_id: "5ebdbea72f597d1f281fc1c0",
//     name: "Spaghetti alla Amatriciana",
//     description: "Piatto tipico italiano, dove il guanciale è il protagonista indiscusso",
//     price: "20",
//     image: "https://www.cucchiaio.it/content/cucchiaio/it/ricette/2019/12/spaghetti-al-pomodoro/jcr:content/header-par/image-single.img10.jpg/1576681061599.jpg",
//     ingredients: ["Pasta", "Pomodoro", "Guanciale", "Cipolla"]
// }


const ProductPage = ({ match, fetchProduct, addToCart, product }) => {

    const productId = match.params.productId
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        fetchProduct(productId)
    }, [fetchProduct])

    return (
        product ? (<Container>
            <div className='prod-details-center-container'>
                <CardMedia
                    className='prod-details-media'
                    image={product.image}
                />
            </div>
            <div className='prod-details-side-container'>
                <Typography className='prod-details-title' variant='h5' color='textPrimary'>
                    {product.name}
                </Typography>
                <Typography variant='h6' color='textPrimary'>
                    {product.price}€
                </Typography>
            </div>
            <div className="prod-details-info-container">
                <p>{product.description}</p>
                <div className="prod-details-ingredients-container">
                    <Typography className='prod-details-ingredients' variant='h6' color='textPrimary'>
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
                    <div className='prod-details-add-to-cart-container'>
                        <QuantityPicker
                            quantity={quantity}
                            onQuantityIncremented={() => setQuantity(quantity + 1)}
                            onQuantityDecremented={() => setQuantity(quantity - 1)}/>
                        <Button
                            className="prod-details-add-to-cart"
                            variant="contained"
                            color="primary"
                            onClick={() => addToCart(productId, quantity)}
                            startIcon={<AddToCartIcon/>}
                        >Add to cart</Button>
                    </div>
                </ConsumerConstrained>
            </div>
            <AdminConstrained>
                <Fab color="primary"
                     aria-label="add"
                     component={RouterLink}
                     to={`${productId}/edit`}>
                    <EditIcon/>
                </Fab>
            </AdminConstrained>
        </Container>) : null
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