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
import PaymentType from '../../common/PaymentType'
import { updateOrder } from './../../redux/orders/orders.actions'
import HorizontalDivider from '../custom/horizontal-divider.component'
import DeliverOrderDialog from './dialogs/deliver-order-dialog.component'
import SelectRiderDialog from './dialogs/select-rider-dialog.component'
import { AdminConstrained } from "../common/constrained-containers.component";

const OrderItem = ({ order, user, riders, updateOrder }) => {

    const delivery_date = new Date(order.date)

    const [adminDialogOpen, setAdminDialogOpen] = useState(false);
    const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false);

    const handleListItemClick = (rider) => {
        update(rider)
        setAdminDialogOpen(false);
    };

    const handleChipOpen = (e) => {
        e.stopPropagation();

        switch (user.role) {
            case UserRoles.ADMIN:
                if (order.state === OrderState.PENDING) {
                    setAdminDialogOpen(true)
                }
                break;
            case UserRoles.RIDER:
                if (order.state === OrderState.IN_DELIVERY) {
                    setDeliveryDialogOpen(true)
                }
                break;
            default:
                break;
        }
    };


    const handleAdminDialogClose = () => {
        setAdminDialogOpen(false);
    };

    const handleRiderRemove = () => {
        update(null)
    };

    const handleDeliveryDialogClose = () => {
        setDeliveryDialogOpen(false);
    };

    const handleDeliveryDialogConfirm = () => {
        update(order.rider)
        setDeliveryDialogOpen(false)
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
                <div className='order-item'>
                    <div className="left">
                        <Typography variant='h4' color='textPrimary'>
                            {order.userFullName}
                        </Typography>
                        <Typography color='textPrimary'>
                            Delivery date
                        </Typography>
                        <Typography variant='h5' color='textPrimary'>
                            {delivery_date.toLocaleDateString()} - {order.time}
                        </Typography>
                    </div>
                    <div className="right">
                        <OrderStateChip state={order.state} handleOnClick={handleChipOpen} />
                        <AdminConstrained>
                            {
                                order.state === OrderState.PENDING || user.role !== UserRoles.ADMIN ? null : <Chip className="rider-chip" size="small"
                                    label={`${order.rider.name} ${order.rider.surname}`}
                                    onDelete={user.role === UserRoles.ADMIN && order.state === OrderState.IN_DELIVERY ? handleRiderRemove : null} />
                            }
                        </AdminConstrained>
                        <Typography color='textPrimary'>
                            Total Price:
                        </Typography>
                        <Typography variant='h5' color='textPrimary'>
                            {order.totalPrice && order.totalPrice.toFixed(2)}€
                        </Typography>
                        <Typography variant='h6' color='primary' fontWeight="fontWeightBold">
                            {order.paymentType === PaymentType.ON_DELIVERY ? "Cash payment" : "Payed online"}
                        </Typography>
                    </div>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="collapsed-detail">
                <div className="products">
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
                <div className="delivery-info">
                    <div>
                        <Typography color='textPrimary'>
                            Address
                        </Typography>
                        <Typography variant='h5' color='textPrimary'>
                            {order.address}
                        </Typography>
                        <Typography variant='h5' color='textPrimary'>
                            {order.city}
                        </Typography>
                    </div>
                    <div className="telephone-container">
                        <Typography color='textPrimary'>
                            Telephone number
                        </Typography>
                        <Typography variant='h5' color='textPrimary'>
                            {order.telephoneNumber}
                        </Typography>
                    </div>
                </div>
            </ExpansionPanelDetails>
            <SelectRiderDialog riders={riders} open={adminDialogOpen} handleClose={handleAdminDialogClose}
                handleListItemClick={handleListItemClick} />
            <DeliverOrderDialog open={deliveryDialogOpen} handleDiscard={handleDeliveryDialogClose}
                handleConfirm={handleDeliveryDialogConfirm} />
        </ExpansionPanel>
    )
}
const mapStateToProps = state => {
    const currentUser = state.user.data
    return {
        user: currentUser,
        riders: currentUser.role === UserRoles.ADMIN ? state.adminData.riders : null
    }
}
export default connect(mapStateToProps, { updateOrder })(OrderItem)