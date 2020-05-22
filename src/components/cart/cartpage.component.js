import React, { useEffect } from "react";
import { fetchCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import CartProductItem from "./cartproductitem.component";
import { Button, Container, Divider, Grid, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import "./cartpage.style.scss"
import Progress from "../common/progress.component";
import ErrorSnackbar from "../common/error-snackbar.component";

const CartPage = ({ fetchCart, cart, history }) => {
    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    const { products, error, loading, total } = cart

    return (
        <Container maxWidth='md'>
            <Grid className="products-list" container spacing={2}>
                {
                    products && products.map(product => {
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
                    onClick={() => history.push('/summary')}>
                    Proceed to order
                </Button>
                <div className="total-info-container">
                    <Typography variant='h6' color='textPrimary'>Total:</Typography>
                    <Typography variant='h5' color='textPrimary'>{total}</Typography>
                </div>
            </div>
            <Progress loading={loading}/>
            {error && (<ErrorSnackbar errorMessage={error}/>)}
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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPage))