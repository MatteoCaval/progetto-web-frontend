import React from "react";
import { Grid } from "@material-ui/core";
import OrderItem from "./order-item.component";

const OrderList = ({ orders }) => {
    return (
        <Grid className="orders-list" container spacing={2}>
            {
                orders && (
                    orders.map(order => {
                        return (
                            <Grid key={order._id} item xs={12} sm={12}>
                                <OrderItem key={order._id} order={order}/>
                            </Grid>
                        )
                    })
                )
            }
        </Grid>
    )
}

export default OrderList
