import React from "react";
import CategoryList from "./category/category-list.component";
import { Route, Switch } from "react-router-dom";
import ProductList from "./product/product-list.component";
import { Container } from '@material-ui/core'
import ProductForm from "./product/product-form.component";

const CatalogPage = ({ match }) => {

    return (
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
                    path={`${match.path}:categoryId`}
                    component={ProductList}
                />
            </Switch>
        </Container>
    )

}

export default CatalogPage
