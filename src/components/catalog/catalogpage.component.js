import React from "react";
import CategoryList from "./category/category-list.component";
import {Route, Switch, withRouter} from "react-router-dom";
import ProductList from "./product/product-list.component";
import {Container} from '@material-ui/core'
import ProductForm from "./product/product-form.component";
import CategoryForm from "./category/category-form.component";
import ProductPage from "./product/product-page.component";
import Progress from "../common/progress.component";
import {connect} from "react-redux";
import NotFoundItem from "../error/not-found-item.component";
import OpsPage from "../error/ops-page.component";

const CatalogPage = ({ match, loading, error }) => {

    let errorView;
    if (error) {
        if (error.code === 404) {
            errorView = (<NotFoundItem />)
        } else if (!error.code ) {
            errorView = (<OpsPage />)
        }
    }

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
            {errorView}
            <Progress loading={loading}/>
        </Container>
    )

}

const mapStateToProps = state => {
    return {
        loading: state.catalog.loading,
        error: state.catalog.error ? state.catalog.error : null
    }
}

export default withRouter(connect(mapStateToProps)(CatalogPage))
