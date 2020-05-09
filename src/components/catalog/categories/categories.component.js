import React from "react";
import {connect} from "react-redux";

const Categories = ({categories}) => {
    console.log(categories)
    return (
        categories.map(category => <h1>{category.name}</h1>)
    )

}


const mapStateToProps = (state) => {
    return {
        categories: state.catalog.categories
    }
}

export default connect(mapStateToProps)(Categories)
