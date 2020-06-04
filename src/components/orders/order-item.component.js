import React, { useState, useEffect } from 'react'
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Chip,
    DialogTitle,
    Avatar,
    List,
    ListItem, 
    ListItemAvatar, 
    ListItemText, 
} from '@material-ui/core'

import "./order-item.style.scss"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import OrderProductItem from "./order-product-item.component"
import OrderStateChip from "./order-state-chip.component"
import { connect } from "react-redux";
import UserRoles from "./../../common/UserRoles"
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike'
import OrderState from './order-state'
import { updateOrder } from './../../redux/orders/orders.actions'

const OrderItem = ({ order, user, riders, updateOrder }) => {

    const order_date = new Date(order.creationDate)
    const delivery_date = new Date(order.date)

    const [open, setOpen] = useState(false);

    const handleListItemClick = (rider) => {
        update(rider)
        setOpen(false);
    };

    const handleClickOpen = (e) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRiderRemove = () => {
        update(null)
    };

    const update = (rider) => {
        const orderState = rider != null ? OrderState.IN_DELIVERY : OrderState.PENDING
        const riderId = rider != null ? rider.id : null
        updateOrder(order._id, orderState, riderId)
    }

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
                            {delivery_date.toLocaleDateString()} - {order.time}
                        </Typography>
                    </div>
                    <div className="right-container">
                        <OrderStateChip state={order.state} handleOnClick={user.role === UserRoles.ADMIN && order.state === OrderState.PENDING ? handleClickOpen : null} />
                        {
                            order.state === OrderState.PENDING ? null : <Chip className="rider-chip" size="small" label={`${order.rider.name} ${order.rider.surname}`} onDelete={handleRiderRemove} />
                        }
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
                    <List>
                        {riders && riders.map((rider) => (
                            <ListItem button onClick={() => handleListItemClick(rider)} key={rider.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <DirectionsBikeIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`${rider.name} ${rider.surname}`} />
                            </ListItem>
                        ))}
                    </List>
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
    const currentUser = state.user
    return {
        user: currentUser,
        riders: currentUser.role === UserRoles.ADMIN ? state.adminData.riders : null
    }
}
export default connect(mapStateToProps, { updateOrder })(OrderItem)