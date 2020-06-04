import React, { useState } from 'react'
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Typography,
    Chip
} from '@material-ui/core'

import "./order-item.style.scss"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import OrderProductItem from "./order-product-item.component"
import OrderStateChip from "../custom/order-state-chip.component"
import { connect } from "react-redux";
import UserRoles from "./../../common/UserRoles"
import OrderState from '../../common/OrderState'
import { updateOrder } from './../../redux/orders/orders.actions'
import HorizontalDivider from '../custom/horizontal-divider.component'
import SelectRiderDialog from './select-rider-dialog.component'

const OrderItem = ({ order, user, riders, updateOrder }) => {

    const order_date = new Date(order.creationDate)
    const delivery_date = new Date(order.date)

    const [adminDialogOpen, setAdminDialogOpen] = useState(false);

    const handleListItemClick = (rider) => {
        update(rider)
        setAdminDialogOpen(false);
    };

    const handleClickOpen = (e) => {
        e.stopPropagation();

        switch (user.role) {
            case UserRoles.ADMIN:
                if (order.state === OrderState.PENDING) {
                    setAdminDialogOpen(true)
                }
                break;
            case UserRoles.RIDER:
                update(order.rider)
                break;
            default:
                break;
        }
    };

    const handleClose = () => {
        setAdminDialogOpen(false);
    };

    const handleRiderRemove = () => {
        update(null)
    };

    const update = (rider) => {
        const riderId = rider != null ? rider.id : null
        switch (user.role) {
            case UserRoles.ADMIN:
                const orderState = rider != null ? OrderState.IN_DELIVERY : OrderState.PENDING
                updateOrder(order._id, orderState, riderId)
                break;
            case UserRoles.RIDER:
                updateOrder(order._id, OrderState.DELIVERED, riderId)
                break;
            default:
                break;
        }
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
                        <OrderStateChip state={order.state} handleOnClick={handleClickOpen} />
                        {
                            order.state === OrderState.PENDING ? null : <Chip className="rider-chip" size="small" label={`${order.rider.name} ${order.rider.surname}`} onDelete={user.role === UserRoles.ADMIN && order.state === OrderState.IN_DELIVERY ? handleRiderRemove : null} />
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
            <ExpansionPanelDetails className="collapsed-container">
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
                <HorizontalDivider />
                <div className="delivery-info-container">
                    <div>
                        <Typography color='textPrimary'>
                            Address
                        </Typography>
                        <Typography variant='h6' color='textPrimary'>
                            {order.address}
                        </Typography>
                        <Typography variant='h6' color='textPrimary'>
                            {order.city}
                        </Typography>
                    </div>
                    <div className="telephone-container">
                        <Typography color='textPrimary'>
                            Telephone number
                        </Typography>
                        <Typography variant='h6' color='textPrimary'>
                            {order.telephoneNumber}
                        </Typography>
                    </div>
                </div>
            </ExpansionPanelDetails>
            <SelectRiderDialog riders={riders} open={adminDialogOpen} handleClose={handleClose} handleListItemClick={handleListItemClick}/> 
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