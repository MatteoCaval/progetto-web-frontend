import React from "react";
import CategoryList from "../../components/catalog/category/category-list.component";
import { Route } from "react-router-dom";
import ProductList from "../../components/catalog/product/product-list.component";

const CatalogPage = ({ match }) => {
    console.log('b')
    return (
        <div>
            <Route
                exact
                path={`${match.path}`}
                component={CategoryList}/>
            <Route
                path={`${match.path}:categoryName`}
                component={ProductList}
            />
        </div>
    )

}

export default CatalogPage
