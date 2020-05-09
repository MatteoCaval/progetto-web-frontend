import React from "react";

const Category = ({category}) => {
    return (
        <h1 key={category.id}>{category.name}</h1>
    )
}

export default Category