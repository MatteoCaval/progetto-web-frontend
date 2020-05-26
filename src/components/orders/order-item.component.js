import React from 'react'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Typography } from '@material-ui/core'

import "./order-item.style.scss"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import OrderProductItem from "./order-product-item.component"
import OrderStateChip from "./order-state-chip.component"

const OrderItem = ({ order }) => {

    const order_date = new Date(order.creationDate)
    const delivery_date = new Date(order.date)
    const delivery_time = new Date(order.time)
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
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
                        <OrderStateChip state={order.state}/>
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
                                    <OrderProductItem key={product._id} product={product}/>
                                </Grid>
                            )
                        })}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default OrderItem