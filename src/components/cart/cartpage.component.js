import React, { useEffect } from "react";
import { fetchCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import CartProductItem from "./cartproductitem.component";

const CartPage = ({ fetchCart, cart }) => {
    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    return (
        <div>
            {
                cart.products.map(product => <CartProductItem key={product.id} product={product}/>)
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