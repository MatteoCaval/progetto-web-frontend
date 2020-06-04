import React, { useState } from 'react'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@material-ui/core'

import "./order-item.style.scss"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import OrderProductItem from "./order-product-item.component"
import OrderStateChip from "./order-state-chip.component"
import { connect } from "react-redux";
import UserRoles from  "./../common/userRoles"

const riders = [
    {
        id: 1,
        name: "Rider 1",
        email: "rider1@fooddelivery.it"
    },
    {
        id: 2,
        name: "Rider 2",
        email: "rider2@fooddelivery.it"
    },
    {
        id: 3,
        name: "Rider 3",
        email: "rider3@fooddelivery.it"
    }
]

const OrderItem = ({ order, user }) => {

    const order_date = new Date(order.creationDate)
    const delivery_date = new Date(order.date)
    const delivery_time = new Date(order.time)

    const [open, setOpen] = useState(false);
    const [selectedRider, setSelectedRider] = useState('');

    const handleChange = (event) => {
        setSelectedRider(event.target.value);
    };

    const handleClickOpen = (e) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className='order-root'>
                    <div className="left-container">
                        <Typography variant='h5' color='textPrimary'>
                            Order {order._id}
                        </Typography>
                        <Typography variant='h6' color='textPrimary'>
                            of {order_date.toLocaleDateString()}
                        </Typography>
                        <Typography color='textPrimary'>
                            Delivery date
                        </Typography>
                        <Typography variant='h6' color='textPrimary'>
                            {delivery_date.toLocaleDateString()} - {delivery_time.toLocaleTimeString()}
                        </Typography>
                    </div>
                    <div className="right-container">
                        <OrderStateChip state={order.state} handleOnClick={user.role === UserRoles.ADMIN ? handleClickOpen : null} />
                        <Typography color='textPrimary'>
                            Total Price:
                        </Typography>
                        <Typography variant='h6' color='textPrimary'>
                            {order.totalPrice}€
                        </Typography>
                    </div>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className="order-products-container">
                    {
                        order.products.map(product => {
                            return (
                                <Grid key={product._id} item xs={12} sm={12}>
                                    <OrderProductItem key={product._id} product={product} />
                                </Grid>
                            )
                        })}
                </div>
            </ExpansionPanelDetails>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Assign this order</DialogTitle>
                <DialogContent>
                    <TextField
                        value={selectedRider}
                        select
                        label="Rider"
                        fullWidth
                        onChange={handleChange}>
                        {
                            riders.map((rider, index) =>
                                <MenuItem key={index} value={rider.id}>{rider.name}</MenuItem>
                            )
                        }
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </ExpansionPanel>
    )
}
const mapStateToProps = state => {
    return {
        user: state.user.currentUser,
    }
}
export default connect(mapStateToProps, null)(OrderItem)