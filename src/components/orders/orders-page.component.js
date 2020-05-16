import React, { useEffect } from "react";
import { fetchOrders } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const OrdersPage = ({ orders, fetchOrders }) => {

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return (
        <div>
            {
                orders && (
                    orders.map(order => <p key={order._id}>{order.date}</p>)
                )
            }
        </div>
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