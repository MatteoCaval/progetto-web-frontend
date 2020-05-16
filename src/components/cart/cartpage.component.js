import React, { useEffect } from "react";
import { fetchCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import CartProductItem from "./cartproductitem.component";
import { Grid, Container, Divider, Button, Typography } from "@material-ui/core";
import "./cartpage.style.scss"

const CartPage = ({ fetchCart, cart }) => {
    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    console.log(cart.products)

    return (
        <Container maxWidth='md'>
            <Grid className="products-list" container spacing={2}>
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
                    variant="contained"
                    color="primary"
                    className="proceed-to-order">
                    Proceed to order
                        </Button>
                <div className="total-info-container">
                    <Typography variant='h6' color='textPrimary'>
                        Total:
                            </Typography>
                    <Typography variant='h5' color='textPrimary'>
                        1000.00€
                            </Typography>
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