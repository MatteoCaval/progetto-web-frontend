import React, { useEffect, useState } from "react";
import { Button, Card, CardActionArea, Container, Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import { completeOrder } from "../../redux/orders/orders.actions";
import { clearOrderData, fetchTodayTimetable } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import PaymentType from "./payment-type"

import "./order-summary.style.scss"
import { withRouter } from "react-router-dom";
import HorizontalDivider from "../custom/horizontal-divider.component";
import OrderCompletedDialog from "../orders/dialogs/order-completed-dialog";

const cities = [
    'San Mauro Pascoli',
    'Gatteo',
    'Savignano sul Rubicone',
    'Santarcangelo di ROmagna',
    'Longiano',
    'Gambettola',
    'Bellaria',
    'Cesenatico',
    'Borghi'
]

const OrderSummaryPage = ({ user, completeOrder, total, timeSlots, fetchTodayTimetable, orderCompleted, clearOrderData, history }) => {
    const [cashPayment, setCashPayment] = useState(1);
    const [orderData, setOrderData] = useState({
        name: user.name,
        surname: user.surname,
        address: '',
        city: '',
        timeSlot: '',
        telephoneNumber: '',
        paymentType: '',
        total
    })

    useEffect(() => {
        fetchTodayTimetable()
    }, [fetchTodayTimetable])

    useEffect(() => {
        setOrderData({ ...orderData, 'paymentType': cashPayment ? PaymentType.ON_DELIVERY : PaymentType.ONLINE })
    }, [cashPayment])

    const handleCashPaymentSelect = () => {
        setCashPayment(true)
    }

    const handlePayNowSelect = () => {
        setCashPayment(false)
    }

    const handleChange = event => {
        const { value, name } = event.target
        setOrderData({ ...orderData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        completeOrder(orderData)
    }

    return (
        <React.Fragment>
            <Typography variant="h1" className="page-title">Order summary</Typography>
            <Container maxWidth='md'>
                <div className="order-header">
                    <div className="total">
                        <Typography variant='h2' color='textPrimary'>Total:</Typography>
                        <Typography variant='h3' color='textPrimary'>{total.toFixed(2)}€</Typography>
                    </div>
                    <HorizontalDivider />
                </div>
                <form onSubmit={handleSubmit} className="order-form">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='name'
                                name='name'
                                value={orderData.name}
                                variant='outlined'
                                autoComplete='off'
                                required
                                fullWidth
                                onChange={handleChange}
                                label='Name' />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='surname'
                                name='surname'
                                value={orderData.surname}
                                variant='outlined'
                                autoComplete='off'
                                required
                                fullWidth
                                onChange={handleChange}
                                label='Surname' />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='address'
                                name='address'
                                variant='outlined'
                                autoComplete='off'
                                required
                                fullWidth
                                onChange={handleChange}
                                label='Address' />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                id="city"
                                name="city"
                                value={orderData.city}
                                required
                                label="Città"
                                fullWidth
                                onChange={handleChange}
                                variant="outlined">
                                {
                                    cities.map((city, index) =>
                                        <MenuItem key={index} value={city}>{city}</MenuItem>
                                    )
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='telephoneNumber'
                                name='telephoneNumber'
                                variant='outlined'
                                autoComplete='off'
                                required
                                fullWidth
                                type='tel'
                                onChange={handleChange}
                                label='Telephone Number' />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            {
                                timeSlots ? <TextField
                                    select
                                    id="timeSlot"
                                    name="timeSlot"
                                    disabled={timeSlots.length < 1}
                                    value={orderData.timeSlot}
                                    required
                                    label="Orario di consegna"
                                    fullWidth
                                    onChange={handleChange}
                                    children={[]}
                                    variant="outlined">
                                    {
                                        timeSlots && timeSlots.map((slot, index) =>
                                            <MenuItem key={index} value={slot}>{slot}</MenuItem>
                                        )
                                    }
                                </TextField> : null
                            }

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Card className={cashPayment ? 'card-selected' : ''}
                                variant='outlined'>
                                <CardActionArea className='payment-card'
                                    onClick={handleCashPaymentSelect}>
                                    <div
                                        className='content'>
                                        <Typography variant='h3' color='textPrimary' className="title">
                                            Paga in contanti
                                        </Typography>
                                        <Typography color='textPrimary'>
                                            Paga in contanti all'arrivo del fattorino.
                                        </Typography>
                                        <Typography color='textPrimary'>
                                            Nessuna spesa aggiunta, ma ti chiediamo di preparare i contanti.
                                        </Typography>
                                    </div>
                                </CardActionArea>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Card className={cashPayment ? '' : 'card-selected'}
                                variant='outlined'>
                                <CardActionArea className='payment-card'
                                    onClick={handlePayNowSelect}>
                                    <div
                                        className='content'>
                                        <Typography variant='h3' color='textPrimary' className="title">
                                            Paga ora
                                        </Typography>
                                        <Typography color='textPrimary'>
                                            La comodità di pagare subito con la tua carta.
                                        </Typography>
                                    </div>
                                </CardActionArea>
                            </Card>
                        </Grid>


                    </Grid>
                    <div className="button-container">
                        <Button
                            className="submit"
                            variant='contained'
                            type='submit'
                            disabled={timeSlots.length < 1}
                            color='secondary'>
                            Concludi l'ordine
                        </Button>
                        {
                            timeSlots.length < 1 ? 
                                <div className="no-slots">
                                <Typography variant="h3" color="primary">Al momento il negozio è chiuso.</Typography>
                                <Typography variant="h3" color="primary">Non è possibile effetuare nessun ordine.</Typography>
                                </div> : null
                        }
                    </div>
                </form>
            </Container>
            <OrderCompletedDialog open={orderCompleted}
                                  goHomeAction={() => {
                                      history.push('/')
                                      clearOrderData()
                                  }}
                                  goMyOrdersAction={() => {
                                      history.push('/orders')
                                      clearOrderData()
                                  }}/>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        completeOrder: (orderData) => dispatch(completeOrder(orderData)),
        fetchTodayTimetable: () => dispatch(fetchTodayTimetable()),
        clearOrderData: () => dispatch(clearOrderData())
    }
}

const mapStateToProps = state => {
    return {
        total: state.cart.total,
        timeSlots: state.cart.timetable,
        orderCompleted: state.cart.orderCompleted,
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSummaryPage))