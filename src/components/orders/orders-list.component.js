import React, { useEffect } from "react";
import { fetchOrders } from "../../redux/user/user.actions";
import { Grid, Container} from "@material-ui/core";
import { connect } from "react-redux";
import OrderItem from "./order-item.component";


const OrdersPage = ({ orders, fetchOrders }) => {

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return (
        <Container maxWidth='md'>
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
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.user.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage)