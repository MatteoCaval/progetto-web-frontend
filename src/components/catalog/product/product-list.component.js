import React from "react";
import { fetchProductsForCategory } from "../../../redux/catalog/catalog.actions";
import ProductItem from "./product-item.component";
import { connect } from "react-redux";

class ProductList extends React.Component {

    componentDidMount() {
        console.log('a')
        this.props.fetchCategoryProducs(this.props.match.params.categoryId)
    }

    render() {
        const { products } = this.props
        return products.map(product => <ProductItem key={product.id} product={product}/>)
    }

}

const mapStateToProps = (state) => {
    return {
        products: state.catalog.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoryProducs: (categoryId) => dispatch(fetchProductsForCategory(categoryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)