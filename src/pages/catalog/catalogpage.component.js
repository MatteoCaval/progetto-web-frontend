import React from "react";
import CategoryList from "../../components/catalog/category/category-list.component";
import { Route } from "react-router-dom";

const CatalogPage = ({ match }) => {

    return (
        <Route
            exact={`${match.path}`}
            component={CategoryList}/>
    )

}

export default CatalogPage
