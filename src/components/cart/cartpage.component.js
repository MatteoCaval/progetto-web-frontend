import React, { useEffect } from "react";
import { fetchCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import CartProductItem from "./cartproductitem.component";
import { Grid, Container, Divider, Button } from "@material-ui/core";
import "./cartpage.style.scss"

const CartPage = ({ fetchCart, cart }) => {
    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    console.log(cart.products)

    return (
        <Container maxWidth='md'>
            <Grid container spacing={2}>
                {
                    cart.products.map(product => {
                        return (
                            <Grid key={product.id} item xs={12} sm={12}>
                                <CartProductItem key={product.id} product={product} />
                            </Grid>
                        )
                    })
                }
            </Grid>

            <Divider className='cart-total-divider' />
            <div className="total-container">
                <Button
                    className="proceed-to-order">
                    Proceed to order
                </Button>
                <div total-info-container>
                    <p> Total </p>
                    <p> 10000.00€ </p>
                </div>
            </div>

        </Container>
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