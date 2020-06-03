import React, { useEffect } from "react";
import OrderList from "./orders-list.component";
import { fetchUserOrders } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { Pagination } from "@material-ui/lab";
import { fetchOrderHistory } from "../../redux/orders/orders.actions";
import { Container } from "@material-ui/core";

const PaginatedOrderList = ({ orders, fetchUserOrders, fetchOrderHistory, pageCount, currentPage, pending }) => {

    useEffect(() => {
        fetchOrderHistory()
    }, [fetchOrderHistory])

    const onPageChanged = (event, page) => {
        event.preventDefault()
        fetchOrderHistory(page)
    }

    return (
        <Container maxWidth='md'>
            <OrderList orders={orders}/>
            <Pagination page={currentPage} count={pageCount} color='primary' onChange={onPageChanged}/>
        </Container>
    )

}

const mapStateToProps = state => {
    const { orders, pending, currentPage, pageCount } = state.orders.orderHistory
    return {
        orders,
        pending,
        currentPage,
        pageCount
    }
}


export default connect(mapStateToProps, { fetchUserOrders, fetchOrderHistory })(PaginatedOrderList)