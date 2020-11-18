import React, {useEffect} from "react";
import {fetchProductsForCategory} from "../../../redux/catalog/catalog.actions";
import ProductItem from "./product-item.component";
import {connect} from "react-redux";
import {Button, CardContent, Grid, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {AdminConstrained} from "../../common/constrained-containers.component";
import FabFixed from "../../custom/fab-fixed.component"
import {deleteCategory, resetCatalogOperationsState} from "../../../redux/catalog/catalog-operations.actions";
import {withRouter} from "react-router-dom";
import "./product-list.style.scss"

const ProductList = ({ history, fetchCategoryProducts, match, products, isEmptyCategory, deleteCategory, deletionCompleted, resetCatalogOperationsState }) => {

    const categoryId = match.params.categoryId

    if (deletionCompleted) {
        history.push('/')
        resetCatalogOperationsState()
    }

    useEffect(() => {
        fetchCategoryProducts(categoryId)
    }, [fetchCategoryProducts])

    return (
        <React.Fragment>
            {isEmptyCategory && (
                <div className="empty-shop-button-container">
                    <Typography variant='h2' color='textPrimary'>
                        La categoria è vuota
                    </Typography>
                    <Typography color='textPrimary'>
                        Al momento all'interno di questa categoria non sono presenti prodotti.
                    </Typography>
                    <AdminConstrained>
                        <Button
                            className="delete-category-button"
                            variant="contained"
                            color="primary"
                            onClick={() => deleteCategory(categoryId)}
                        >Remove</Button>
                    </AdminConstrained>
                </div>
            )}
            {
                (products && !products.isEmpty) ?
                    <Typography className="category-name-header" variant='h2' color='textPrimary' align='center'>
                        <b>{products.map(p => p.categoryName)[0]}</b>
                    </Typography> : null
            }
            <Grid container spacing={2}>
                {
                    products.map(product => {
                        return (
                            <Grid key={product.id} item xs={6} sm={4}>
                                <ProductItem key={product.id} product={product} />
                            </Grid>
                        )
                    })
                }
            </Grid>
            <AdminConstrained>
                <FabFixed icon={<AddIcon />} to={`${categoryId}/createproduct`} />
            </AdminConstrained>
        </React.Fragment>
    )
}


const mapStateToProps = (state, ownProps) => {
    const categoryId = ownProps.match.params.categoryId
    return {
        isEmptyCategory: !state.catalog.products.length && !state.catalog.loading && !state.catalog.error,
        products: state.catalog.products.filter(product => product.categoryId === categoryId),
        deletionCompleted: state.catalogOperations.loading
    }
}


export default withRouter(connect(mapStateToProps, {
    fetchCategoryProducts: fetchProductsForCategory,
    deleteCategory,
    resetCatalogOperationsState
})(ProductList))