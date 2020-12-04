import React, { useEffect, useState } from "react";
import { Button, Card, Container, Grid, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchProductDetail } from "../../../redux/catalog/catalog.actions";
import {
    createProduct,
    resetCatalogOperationsState,
    updateProduct
} from "../../../redux/catalog/catalog-operations.actions";
import Progress from "../../common/progress.component";
import { withRouter } from "react-router-dom";
import StringListPicker from "../../custom/string-list-builder.component";
import './product-form.style.scss'

const ProductForm = ({ history, match, startingProduct, editMode, fetchProductDetail, updateProduct, createProduct, loading, error, completed, resetCatalogOperationsState }) => {

    const { categoryId, productId } = match.params

    if (completed) {
        history.push(`/${categoryId}`)
        resetCatalogOperationsState()
    }

    const [productData, setProductData] = useState({
        name: '',
        image: '',
        description: '',
        price: '',
        ingredients: []
    })

    useEffect(() => {
        if (editMode && productId) {
            fetchProductDetail(productId)
        }
    }, [fetchProductDetail])

    // precompila in campi in caso di edit
    useEffect(() => {
        if (startingProduct && editMode) {
            setProductData({
                ...productData,
                name: startingProduct.name,
                image: startingProduct.image,
                description: startingProduct.description,
                price: startingProduct.price.toFixed(2),
                ingredients: startingProduct.ingredients
            })
        }
    }, [startingProduct])


    const handleChange = event => {
        const { value, name } = event.target
        setProductData({ ...productData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (editMode) {
            updateProduct({
                ...productData,
                productId,
                category_id: categoryId
            })
        } else {
            createProduct({
                ...productData,
                category_id: categoryId
            })
        }

    }

    const addIngredient = (newIngredient) => {
        const ingredients = productData.ingredients
        const index = ingredients.indexOf(newIngredient)
        if (index < 0) {
            ingredients.push(newIngredient)
        }
        setProductData({ ...productData, 'ingredients': ingredients })
    }

    const updateIngredient = (oldValue, newValue) => {
        const ingredients = productData.ingredients
        const index = ingredients.indexOf(oldValue)
        ingredients[index] = newValue
        setProductData({ ...productData, 'ingredients': ingredients })
    }

    const deleteIngredient = (ingredient) => {
        const filtered = productData.ingredients.filter(function (item) {
            return item !== ingredient
        })
        setProductData({ ...productData, 'ingredients': filtered })
    }

    return (
        <Container className="product-form" maxWidth='xs'>
            <Typography variant="h2" className="page-title">{editMode ? "Edit product" : "New product"}</Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id='name'
                            name='name'
                            autoComplete='off'
                            variant='outlined'
                            required
                            type='string'
                            fullWidth
                            value={productData.name}
                            onChange={handleChange}
                            label='Name' />
                    </Grid>
                    {
                        productData.image.length > 0 ?
                            <Grid item xs={12}>
                                <img
                                    className="image"
                                    src={productData.image}
                                    alt='product' />
                            </Grid> : null
                    }

                    <Grid item xs={12}>
                        <TextField
                            id='image'
                            name='image'
                            variant='outlined'
                            autoComplete='off'
                            required
                            type='url'
                            fullWidth
                            value={productData.image}
                            onChange={handleChange}
                            label='Image url' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='description'
                            name='description'
                            variant='outlined'
                            autoComplete='off'
                            required
                            fullWidth
                            multiline
                            rows='3'
                            value={productData.description}
                            onChange={handleChange}
                            label='Description' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='price'
                            name='price'
                            variant='outlined'
                            autoComplete='off'
                            required
                            type='number'
                            fullWidth
                            value={productData.price}
                            onChange={handleChange}
                            label='Price' />
                    </Grid>
                    <Grid item xs={12}>
                        <Card className="ingredients" variant='outlined'>
                            <Typography>Ingredients</Typography>
                            <StringListPicker strings={productData.ingredients} addItem={addIngredient}
                                updateItem={updateIngredient} removeItem={deleteIngredient} />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                            Done
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Progress loading={loading} />
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { loading, error, completed } = state.catalogOperations
    return {
        startingProduct: state.catalog.productDetails,
        loading,
        error,
        completed
    }
}


export default withRouter(connect(mapStateToProps, {
    fetchProductDetail,
    updateProduct,
    createProduct,
    resetCatalogOperationsState
})(ProductForm))