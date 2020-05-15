import React, { useEffect } from "react";

import "./product-page.style.scss";

import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Container,
} from "@material-ui/core";
import { fetchProductDetail } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";

// const product =
//     {
//         category_id: "5ebdbea72f597d1f281fc1c0",
//         name: "Spaghetti alla Amatriciana",
//         description: "Piatto tipico italiano, dove il guanciale è il protagonista indiscusso",
//         price: "20",
//         image: "https://www.cucchiaio.it/content/cucchiaio/it/ricette/2019/12/spaghetti-al-pomodoro/jcr:content/header-par/image-single.img10.jpg/1576681061599.jpg",
//         ingredients: ["Pasta", "Pomodoro", "Guanciale", "Cipolla"]
//     }


const ProductPage = ({ match, fetchProduct, product }) => {

    const productId = match.params.productId

    useEffect(() => {
        fetchProduct(productId)
    }, [fetchProduct])
    
    return (
        product ? (<Container>
            <div className='line-container'>
                <CardMedia
                    className='media'
                    image={product.image}
                />
            </div>
            <div className='title-container'>
                <Typography className='title' variant='h5' color='textPrimary'>
                    {product.name}
                </Typography>
                <Typography variant='h6' color='textPrimary'>
                    {product.price}€
                </Typography>
            </div>

            <p>{product.description}</p>
            <Typography className='ingredients' variant='h6' color='textPrimary'>
                Ingredienti:
            </Typography>
            <ul className="ingredients">
                {
                    product.ingredients.map((ingredient, index) =>
                        <li key={index}>{ingredient}</li>
                    )
                }
            </ul>
            <div className='line-container'>


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
        fetchProduct: productId => dispatch(fetchProductDetail(productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)