import React from "react";
import { fetchProductsForCategory } from "../../../redux/catalog/catalog.actions";
import ProductItem from "./product-item.component";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import ProductPage from "./product-page.component";
import { Route, Switch } from "react-router-dom";

class ProductList extends React.Component {

    componentDidMount() {
        this.props.fetchCategoryProducs(this.props.match.params.categoryId)
    }

    render() {
        const { products } = this.props
        return (
            <div>
                <Switch>
                    <Route path={`${this.props.match.url}/:productId`} component={ProductPage} />
                    <Route path={this.props.match.url}>
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
                    </Route>
                </Switch>


            </div>

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