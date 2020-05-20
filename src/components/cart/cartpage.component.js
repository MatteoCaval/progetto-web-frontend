import React, { useEffect } from "react";
import { fetchCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import CartProductItem from "./cartproductitem.component";
import { Grid, Container, Divider, Button, Typography } from "@material-ui/core";
import "./cartpage.style.scss"
import { completeOrder } from "../../redux/orders/orders.actions";

const CartPage = ({ fetchCart, cart, completeOrder }) => {
    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    return (
        <Container maxWidth='md'>
            <Grid className="products-list" container spacing={2}>
                {
                    cart.prodcuts && cart.products.map(product => {
                        return (
                            <Grid key={product.id} item xs={12} sm={12}>
                                <CartProductItem key={product.id} product={product}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Divider className='cart-total-divider'/>
            <div className="total-container">
                <Button
                    variant="contained"
                    color="primary"
                    className="proceed-to-order"
                    onClick={() => completeOrder()}
                >
                    Proceed to order
                </Button>
                <div className="total-info-container">
                    <Typography variant='h6' color='textPrimary'>Total:</Typography>
                    <Typography variant='h5' color='textPrimary'>1000.00€</Typography>
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
        fetchCart: () => dispatch(fetchCart()),
        completeOrder: () => dispatch(completeOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)