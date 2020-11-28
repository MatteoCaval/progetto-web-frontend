import React, {useEffect} from "react";
import {fetchCart} from "../../redux/cart/cart.actions";
import {connect} from "react-redux";
import CartProductItem from "./cartproductitem.component";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import {withRouter} from "react-router-dom";

import "./cartpage.style.scss"
import Progress from "../common/progress.component";
import HorizontalDivider from "../custom/horizontal-divider.component";

const CartPage = ({ fetchCart, cart, history }) => {

    useEffect(() => {
        fetchCart()
    }, [fetchCart])


    const { products, error, loading, total } = cart

    if (products && products.length) {
        return (
            <React.Fragment>
                <Typography variant="h1" className="page-title">Cart</Typography>
                <Container maxWidth='md'>
                    <Grid className="products-list" container spacing={2}>
                        {
                            products.map(product => {
                                return (
                                    <Grid key={product.id} item xs={12} sm={12}>
                                        <CartProductItem key={product.id} product={product}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>

                    <div className="cart-page-end-list">
                        <HorizontalDivider/>
                        <div className="total-container">
                            <Button
                                variant="contained"
                                color="primary"
                                className="proceed-to-order"
                                onClick={() => history.push('/summary')}>
                                Proceed to order
                            </Button>

                            <div className="total-info-container">
                                <Typography variant='h2' color='textPrimary'>Total:</Typography>
                                <Typography variant='h3' color='textPrimary'>{total.toFixed(2)}€</Typography>
                            </div>
                        </div>
                    </div>
                    <Progress loading={loading}/>
                </Container>
            </React.Fragment>
        )
    } else {
        if (error && error.description) {
            return (
                // TODO visualizzare errore più bello
                <p>{error.description}</p>
            )
        } else {
            return (
                <Container maxWidth='md'>
                    {(products && !loading && !error) ? (
                        <div className="empty-shop-button-container">
                            <Typography variant='h2' color='textPrimary'>
                                Il carrello è vuoto
                            </Typography>
                            <Typography color='textPrimary'>
                                Al momento all'interno del tuo carrello non sono presenti prodotti.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                className="back-to-shop-button"
                                onClick={() => history.push('/')}>
                                Back to shop
                            </Button>
                        </div>
                    ) : null
                    }
                </Container>
            )
        }

    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}


export default withRouter(connect(mapStateToProps, { fetchCart })(CartPage))