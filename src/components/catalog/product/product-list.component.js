import React, { useEffect } from "react";
import { fetchProductsForCategory } from "../../../redux/catalog/catalog.actions";
import ProductItem from "./product-item.component";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AdminConstrained } from "../../common/constrained-containers.component";
import FabFixed from "../../custom/fab-fixed.component"

const ProductList = ({ fetchCategoryProducts, match, products }) => {

    const categoryId = match.params.categoryId

    useEffect(() => {
        fetchCategoryProducts(categoryId)
    }, [fetchCategoryProducts])

    return (
        <div>
            <React.Fragment>
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
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    const categoryId = ownProps.match.params.categoryId
    return {
        products: state.catalog.products.filter(product => product.categoryId === categoryId)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoryProducts: (categoryId) => dispatch(fetchProductsForCategory(categoryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)