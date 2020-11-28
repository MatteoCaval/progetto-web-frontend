import React, { useEffect, useState } from "react";

import "./product-page.style.scss";

import { Button, CardMedia, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { fetchProductDetail } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";
import QuantityPicker from "../../custom/quantity-picker.component"
import AddToCartIcon from "@material-ui/icons/AddShoppingCart"
import { addToCart } from "../../../redux/cart/cart.actions";
import { AdminConstrained, ConsumerConstrained } from "../../common/constrained-containers.component";
import { Link as RouterLink, withRouter } from 'react-router-dom'
import { deleteProduct, resetCatalogOperationsState } from "../../../redux/catalog/catalog-operations.actions";
import Link from "@material-ui/core/Link";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HorizontalDivider from "../../custom/horizontal-divider.component";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';


const ProductPage = ({ history, match, fetchProductDetail, addToCart, product, deleteProduct, resetCatalogOperationsState, productDeletionCompleted }) => {

    if (productDeletionCompleted) {
        history.push(`/${product.categoryId}`)
        resetCatalogOperationsState()
    }

    const productId = match.params.productId
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        fetchProductDetail(productId)
    }, [fetchProductDetail])

    return (
        product ? (
            <React.Fragment>
                <Grid container className='prod-details' spacing={2}>
                    <Grid item xs={12} sm={6} className='left'>
                        <CardMedia
                            className='media'
                            image={product.image}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} className="right">
                        <Typography className="page-title" variant='h1'>{product.name}</Typography>

                        <div className="info">
                            <Typography variant='p'>{product.description}</Typography>

                            <Typography variant='h3' color='textPrimary'>€ {product.price.toFixed(2)}</Typography>

                            <Typography variant='p'>Vat included</Typography>

                            <HorizontalDivider />

                            <div className="ingredients-container">
                                <Typography variant='h3' color='textPrimary'>
                                    Ingredienti:
                                </Typography>
                                <List className='ingredients' >
                                    {
                                        product.ingredients.map((ingredient, index) =>
                                            <ListItem className="ingredient">
                                                <ListItemIcon className="icon">
                                                    <DoubleArrowIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText primary={ingredient} />
                                            </ListItem>
                                        )
                                    }
                                </List>
                            </div>

                            <HorizontalDivider />

                            <ConsumerConstrained>
                                <div className='quantity-container'>
                                    <Typography variant="p">Quantity</Typography>

                                    <div className="quantity-picker">
                                        <QuantityPicker
                                            quantity={quantity}
                                            onQuantityIncremented={() => setQuantity(quantity + 1)}
                                            onQuantityDecremented={() => setQuantity(quantity - 1)} />
                                    </div>
                                </div>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => addToCart(productId, quantity)}
                                    startIcon={<AddToCartIcon />}
                                >Add to cart</Button>
                            </ConsumerConstrained>
                            <AdminConstrained>
                                <div className='admin-commands'>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => deleteProduct(product.id)}
                                    >Remove</Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={RouterLink}
                                        to={`${productId}/edit`}
                                    >Edit</Button>
                                </div>
                            </AdminConstrained>
                        </div>
                    </Grid>
                </Grid>
                <div className="bottom">
                    <Typography>
                        <Link component={RouterLink} className="page-title" variant="h2" to={`/${product.categoryId}`}>
                            <ArrowBackIosIcon fontSize="small"/>Back to {product.categoryName}
                        </Link>
                    </Typography>
                </div>
            </React.Fragment>
        ) : null
    )
}

const mapStateToProps = state => {
    return {
        product: state.catalog.productDetails,
        productDeletionCompleted: state.catalogOperations.completed
    }
}


export default withRouter(connect(mapStateToProps, {
    fetchProductDetail,
    addToCart,
    deleteProduct,
    resetCatalogOperationsState

})(ProductPage))