import React from "react";
import CategoryList from "../../components/catalog/category/category-list.component";
import { Route } from "react-router-dom";
import ProductList from "../../components/catalog/product/product-list.component";
import { Container } from '@material-ui/core'

const CatalogPage = ({ match }) => {

    return (
        <Container maxWidth='md'>
            <Route
                exact
                path={`${match.path}`}
                component={CategoryList}/>
            <Route
                path={`${match.path}:categoryName`}
                component={ProductList}
            />
        </Container>
    )

}

export default CatalogPage
