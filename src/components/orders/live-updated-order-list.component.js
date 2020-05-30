import React, { useEffect } from "react";
import OrderList from "./orders-list.component";
import { fetchUserOrders } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const LiveUpdatedOrderList = ({ orders, fetchOrders }) => {

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return (
        <React.Fragment>
            <p>Live updated order list</p>
            <OrderList orders={orders}/>
        </React.Fragment>
    )

}

const mapStateToProps = state => {
    return {
        orders: state.user.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchUserOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveUpdatedOrderList)