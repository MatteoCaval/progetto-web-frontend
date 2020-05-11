import React from "react";
import { withRouter } from "react-router-dom";

const Category = ({ category, history, match }) => {
    console.log(history)
    return (
        <h1
            key={category.id}
            onClick={() => history.push(`${match.url}${category.name}`)}>
            {category.name}
        </h1>
    )
}

export default withRouter(Category)