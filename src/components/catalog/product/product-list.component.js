import React from "react";
import { fetchProductsForCategory } from "../../../redux/catalog/catalog.actions";
import ProductItem from "./product-item.component";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

class ProductList extends React.Component {

    componentDidMount() {
        this.props.fetchCategoryProducs(this.props.match.params.categoryId)
    }

    render() {
        const { products } = this.props
        return (
            <Grid container spacing={3}>
                {
                    products.map(product => {
                        return (
                            <Grid key={product.id} item xs={12} sm={4}>
                                <ProductItem key={product.id} product={product}/>
                            </Grid>
                        )
                    })
                }
            </Grid>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        products: state.catalog.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoryProducs: (categoryId) => dispatch(fetchProductsForCategory(categoryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)