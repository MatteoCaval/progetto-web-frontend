import React, { useEffect } from "react";
import OrderList from "./orders-list.component";
import { connect } from "react-redux";
import { startLiveOrderUpdated, stopLiveOrderUpdated } from "../../redux/orders/orders.actions";
import UserRoles from "../../common/UserRoles";
import { Container } from "@material-ui/core";
import { fetchRiders } from "../../redux/admin/admin.actions";

const LiveOrdersPage = ({ startLiveOrderUpdated, orders, stopLiveOrderUpdated, fetchRiders, userRole}) => {

    useEffect(() => {
        startLiveOrderUpdated()
        return () => {
            stopLiveOrderUpdated()
        }
    }, [])

    useEffect(() => {
        if (userRole === UserRoles.ADMIN){
            fetchRiders()
        }
    }, [])

    return (
        <Container maxWidth='md'>
            <OrderList orders={orders}/>
        </Container>
    )

}

const adminFilters = ['PENDING', 'IN_DELIVERY']
const riderFilter = ['IN_DELIVERY']

const mapStateToProps = state => {
    const userRole = state.user.currentUser ? state.user.currentUser.role : null
    return {
        orders: state.orders.realTimeOrders.filter(order => {
            return userRole === UserRoles.RIDER ? riderFilter.includes(order.state) : adminFilters.includes(order.state)
        }),
        userRole: userRole
    }
}


export default connect(mapStateToProps, {
    startLiveOrderUpdated,
    stopLiveOrderUpdated,
    fetchRiders
})(LiveOrdersPage)