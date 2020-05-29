import React, { useEffect } from "react";
import OrderList from "./orders-list.component";
import { fetchOrders } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const PaginatedOrderList = ({ orders, fetchOrders }) => {

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return (
        <React.Fragment>
            <p>Paginated order list</p>
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
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginatedOrderList)