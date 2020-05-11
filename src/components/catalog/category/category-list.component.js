import React from "react";
import { fetchCategories } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";
import Category from "./category-item.component";

class CategoryList extends React.Component {

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        const { categories } = this.props
        return (
            categories.map(category => <Category key={category.id} category={category}/>)
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.catalog.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)