import React, { useEffect, useState } from "react";
import { Button, Container, Grid, makeStyles, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchProductDetail } from "../../../redux/catalog/catalog.actions";
import {
    createProduct,
    resetProductOperationsState,
    updateProduct
} from "../../../redux/catalog/product/product-operations.actions";
import Progress from "../../common/progress.component";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    form: {
        marginTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(2)
    },
    image: {
        width: '100%'
    }
}))

const ProductForm = ({ history, match, startingProduct, editMode, fetchProductDetail, updateProduct, createProduct, loading, error, completed, resetProductOperationsState }) => {

    const { categoryId, productId } = match.params

    if (completed) {
        history.push(`/${categoryId}`)
        resetProductOperationsState()
    }

    const classes = useStyles();

    const [productData, setProductData] = useState({
        name: '',
        image: '',
        description: '',
        price: '',
        ingredients: ['qualcosa', 'qualcosa2']
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
                price: startingProduct.price,
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

    return (
        <Container className={classes.root} maxWidth='xs'>
            <form className={classes.form} onSubmit={handleSubmit}>
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
                            label='Name'/>
                    </Grid>
                    <Grid item xs={12}>
                        <img
                            className={classes.image}
                            src={productData.image}
                            alt='image-preview'/>
                    </Grid>
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
                            label='Image url'/>
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
                            label='Description'/>
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
                            label='Price'/>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >Done
                    </Button>

                </Grid>
            </form>
            <Progress loading={loading}/>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { productId } = ownProps.match
    const { loading, error, completed } = state.productOperations
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
    resetProductOperationsState
})(ProductForm))