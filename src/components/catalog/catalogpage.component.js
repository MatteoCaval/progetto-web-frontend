import React from "react";
import CategoryList from "./category/category-list.component";
import { Route, Switch, withRouter } from "react-router-dom";
import ProductList from "./product/product-list.component";
import { Container } from '@material-ui/core'
import ProductForm from "./product/product-form.component";
import CategoryForm from "./category/category-form.component";
import ProductPage from "./product/product-page.component";
import Progress from "../common/progress.component";
import { connect } from "react-redux";

const CatalogPage = ({ match, loading, error }) => {
    return (
        // gestire qua dentro il loading ed error generali
        <Container maxWidth='md'>
            <Switch>
                <Route
                    exact
                    path={`${match.path}`}
                    component={CategoryList}/>
                <Route
                    path={`${match.path}:categoryId/createproduct`}
                    component={ProductForm}
                />
                <Route
                    path={`${match.path}:categoryId/edit`}
                    render={(routeProps) => <CategoryForm editMode {...routeProps}/>}
                />
                <Route
                    path={`${match.path}:categoryId/:productId/edit`}
                    render={(routeProps) => <ProductForm editMode {...routeProps}/>}/>

                <Route path={`${match.path}:categoryId/:productId`} component={ProductPage}/>
                <Route
                    path={`${match.path}:categoryId`}
                    component={ProductList}
                />
            </Switch>
            <Progress loading={loading}/>
            {error ? <p>{error}</p> : null}
        </Container>
    )

}

const mapStateToProps = state => {
    return {
        loading: state.catalog.loading,
        error: state.catalog.error ? state.catalog.description : null
    }
}

export default withRouter(connect(mapStateToProps)(CatalogPage))
