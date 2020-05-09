import React from "react";
import { connect } from "react-redux";
import { fetchCategories } from '../../../redux/catalog/catalog.actions'
import Category from "../category/category.component";

class Categories extends React.Component {

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        console.log(this.props)
        const { categories } = this.props
        return (
            categories.map(category => <Category category={category}/>)
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
