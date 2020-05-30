import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardActionArea,
    Container,
    Divider,
    Grid,
    MenuItem,
    TextField,
    Typography
} from "@material-ui/core";
import { completeOrder } from "../../redux/orders/orders.actions";
import { connect } from "react-redux";
import PaymentType from "./payment-type"

import "./order-summary.style.scss"

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

const OrderSummaryPage = ({ completeOrder, total, timetable }) => {
    const [cashPayment, setCashPayment] = useState(1);

    const [orderData, setOrderData] = useState({
        name: '',
        surname: '',
        address: '',
        city: '',
        timeSlot: '',
        telephoneNumber: '',
        paymentType: ''
    })

    function generateSlots(hourStart, minutesStart, hourEnd, minutesEnd) {
        const slots = [];
        var slices = ["00", "30"];

        if (minutesStart == 30) {
            slots.push(hourStart + ":" + minutesStart);
            hourStart++;
        }

        for (var i = hourStart; i < hourEnd; i++) {
            for (var j = 0; j < 2; j++) {
                var time = i + ":" + slices[j];
                slots.push(time);
            }
        }

        slots.push(hourEnd + ":" + "00");

        if (minutesEnd == 30) {
            slots.push(hourEnd + ":" + "30");
        }

        return slots;
    }


    const timeSlotsLaunch = timetable.launchOpen ? generateSlots(timetable.launch.timeStart.hour, timetable.launch.timeStart.minute, timetable.launch.timeEnd.hour, timetable.launch.timeEnd.minute) : [];
    const timeSlotsDinner = timetable.dinnerOpen ? generateSlots(timetable.dinner.timeStart.hour, timetable.dinner.timeStart.minute, timetable.dinner.timeEnd.hour, timetable.dinner.timeEnd.minute) : [];

    const time_slots = timeSlotsLaunch.concat(timeSlotsDinner)

    useEffect(() => {
        setOrderData({ ...orderData, ['paymentType']: cashPayment ? PaymentType.ON_DELIVERY : PaymentType.ONLINE })
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

    return (
        <Container maxWidth='md'>

            <div className="summary-total-container">
                <Typography variant='h6' color='textPrimary'>Total:</Typography>
                <Typography variant='h5' color='textPrimary'>{total}€</Typography>
            </div>

            <Divider className='summary-divider' />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id='name'
                        name='name'
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
                        id="city"
                        name="city"
                        value={orderData.city}
                        select
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
                    <TextField
                        id="timeSlot"
                        name="timeSlot"
                        value={orderData.timeSlot}
                        select
                        required
                        label="Orario di consegna"
                        fullWidth
                        onChange={handleChange}
                        variant="outlined">
                        {
                            time_slots.map((slot, index) =>
                                <MenuItem key={index} value={slot}>{slot}</MenuItem>
                            )
                        }
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card className={cashPayment ? 'card-selected' : ''}
                        variant='outlined'>
                        <CardActionArea className='payment-card'
                            onClick={handleCashPaymentSelect}>
                            <div
                                className='payment-card-content'>
                                <Typography variant='h6' color='textPrimary' className="payment-title">
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
                                className='payment-card-content'>
                                <Typography variant='h6' color='textPrimary' className="payment-title">
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
            <div className="summary-button-container">
                <Button className="place-order" variant='contained'
                    onClick={() => completeOrder(orderData)}
                    color='primary'>
                    Concludi l'ordine
                </Button>
            </div>
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        completeOrder: (orderData) => dispatch(completeOrder(orderData))
    }
}

const mapStateToProps = state => {
    return {
        total: state.cart.total,
        timetable: state.cart.timetable
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryPage)