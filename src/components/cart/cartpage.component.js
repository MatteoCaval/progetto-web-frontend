import React, { useEffect } from "react";
import { fetchCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";

const CartPage = ({ fetchCart, cart }) => {
    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <div>
            {
                cart.products.map(product => <h3 key={product.id}>{`${product.name} x ${product.quantity}`}</h3>)
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCart: () => dispatch(fetchCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)