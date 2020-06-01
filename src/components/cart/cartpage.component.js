import React, { useEffect } from "react";
import { fetchCart, fetchTodayTimetable } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import CartProductItem from "./cartproductitem.component";
import { Button, Container, Divider, Grid, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import "./cartpage.style.scss"
import Progress from "../common/progress.component";
import ErrorSnackbar from "../common/error-snackbar.component";

const CartPage = ({ fetchCart, fetchTodayTimetable, cart, history }) => {
    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    useEffect(() => {
        fetchTodayTimetable()
    }, [fetchTodayTimetable])

    const { products, error, loading, total, timetable } = cart

    const isOpenToday = timetable.launchOpen || timetable.dinnerOpen

    function isNowBefore(hour, minutes) {
        const today = new Date();
        const nowHour = today.getHours();
        const nowMinutes = today.getMinutes();

        if (nowHour > hour) {
            return false;
        }

        if (nowHour == hour) {
            return nowMinutes < minutes
        }

        return true;
    }

    function canOrder() {  
        const isBeforeDinnerEnd = timetable.dinnerOpen ? isNowBefore(timetable.dinner.timeEnd.hour, timetable.dinner.timeEnd.minute) : false;
        if (isOpenToday) {
            if (timetable.launchOpen) {
                return isNowBefore(timetable.launch.timeEnd.hour, timetable.launch.timeEnd.minute) ? true : isBeforeDinnerEnd;
            } else {
                return isBeforeDinnerEnd;
            }
        } 

        return false;
    }

    if (products.length > 0) {
        return (
            <Container maxWidth='md'>
                <Grid className="products-list" container spacing={2}>
                    {
                        products && products.map(product => {
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
                        disabled={!canOrder()}
                        variant="contained"
                        color="primary"
                        className="proceed-to-order"
                        onClick={() => history.push('/summary')}>
                        Proceed to order
                    </Button>
                    
                    {
                        canOrder() ? null : (<span className="shop-closed-label">{isOpenToday ? "The shop has just been closed today" : "The shop is closed today"}</span>)
                    }

                    <div className="total-info-container">
                        <Typography variant='h6' color='textPrimary'>Total:</Typography>
                        <Typography variant='h5' color='textPrimary'>{total}€</Typography>
                    </div>

                </div>
                <Progress loading={loading} />
                {error && (<ErrorSnackbar errorMessage={error} />)}
            </Container>

        )
    } else {
        return (
            <Container maxWidth='md'>
                <div className="empty-shop-button-container">

                    <Typography variant='h5' color='textPrimary'>
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
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCart: () => dispatch(fetchCart()),
        fetchTodayTimetable: () => dispatch(fetchTodayTimetable())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPage))