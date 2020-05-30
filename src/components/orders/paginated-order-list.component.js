import React, { useEffect } from "react";
import OrderList from "./orders-list.component";
import { fetchUserOrders } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { Pagination } from "@material-ui/lab";

const PaginatedOrderList = ({ orders, fetchOrders }) => {

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return (
        <React.Fragment>
            <p>Paginated order list</p>
            <OrderList orders={orders}/>
            <Pagination count={10} color='primary'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaginatedOrderList)