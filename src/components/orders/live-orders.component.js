import React, {useEffect} from "react";
import OrderList from "./orders-list.component";
import {connect} from "react-redux";
import {startLiveOrderUpdated, stopLiveOrderUpdated} from "../../redux/orders/orders.actions";
import UserRoles from "../../common/UserRoles";
import {Container, Typography} from "@material-ui/core";
import {fetchRiders} from "../../redux/admin/admin.actions";

const LiveOrdersPage = ({ startLiveOrderUpdated, orders, stopLiveOrderUpdated, fetchRiders, userRole }) => {

    useEffect(() => {
        startLiveOrderUpdated()
        return () => {
            stopLiveOrderUpdated()
        }
    }, [])

    useEffect(() => {
        if (userRole === UserRoles.ADMIN) {
            fetchRiders()
        }
    }, [])

    return (
        <Container maxWidth='md'>
            <Typography variant="h1" className="page-title">Live orders</Typography>
            <OrderList orders={orders}/>
        </Container>
    )

}

const adminFilters = ['PENDING', 'IN_DELIVERY']
const riderFilter = ['IN_DELIVERY']

const mapStateToProps = state => {
    const userRole = (state.user && state.user.data) ? state.user.data.role : null
    const realTimeOrders = state.orders.realTimeOrders
    return {
        orders: realTimeOrders ? realTimeOrders.filter(order => {
            return userRole === UserRoles.RIDER ? riderFilter.includes(order.state) : adminFilters.includes(order.state)
        }) : null,
        userRole: userRole
    }
}


export default connect(mapStateToProps, {
    startLiveOrderUpdated,
    stopLiveOrderUpdated,
    fetchRiders
})(LiveOrdersPage)