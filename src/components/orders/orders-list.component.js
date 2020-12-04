import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import OrderItem from "./order-item.component";
import RoleConstrained from "../common/role-constrained-container.component";
import "./orders-list.style.scss";

const OrderList = ({ orders }) => {
    return (
        <Container>
            {
                orders && orders.length > 0 ?
                    <Grid className="orders-list" container spacing={2}>
                        {
                            orders && (
                                orders.map(order => {
                                    return (
                                        <Grid key={order._id} item xs={12} sm={12}>
                                            <OrderItem key={order._id} order={order} />
                                        </Grid>
                                    )
                                })
                            )
                        }
                    </Grid>
                    :
                    <div className="empty-list">
                        <Typography variant='h2'>
                            Non ci sono ordini
                         </Typography>
                        <Typography color='textPrimary'>
                            Al momento non ci sono ordini in attesa.
                        </Typography>
                    </div>
            }
        </Container>
    )
}

export default OrderList
