import React, { useEffect } from "react";

import "./product-page.style.scss";

import {
    CardMedia,
    Typography,
    Container,
    Button
} from "@material-ui/core";
import { fetchProductDetail } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";
import QuantityPicker from "./quantity-picker.component"
import AddToCartIcon from "@material-ui/icons/AddShoppingCart"
import { addToCart } from "../../../redux/cart/cart.actions";


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

    const onQuantityChanged = (quantity) => {
        console.log(quantity)
    }
    useEffect(() => {
        fetchProduct(productId)
    }, [fetchProduct])

    return (
        product ? (<Container>
            <div className='center-container'>
                <CardMedia
                    className='media'
                    image={product.image}
                />
            </div>
            <div className='side-container'>
                <Typography className='title' variant='h5' color='textPrimary'>
                    {product.name}
                </Typography>
                <Typography variant='h6' color='textPrimary'>
                    {product.price}€
                </Typography>
            </div>
            <div className="info-container">
                <p>{product.description}</p>
                <div className="ingredients-container">
                    <Typography className='ingredients' variant='h6' color='textPrimary'>
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

                <div className='add-to-cart-container'>
                    <QuantityPicker onValueChanged={onQuantityChanged} />
                    <Button
                        className="add-to-cart"
                        variant="contained"
                        color="primary"
                        onClick={() => addToCart(productId)}
                        startIcon={<AddToCartIcon />}
                    >Add to cart</Button>
                </div>
            </div>

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
        addToCart: productId => dispatch(addToCart(productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)