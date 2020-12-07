import React, {useEffect} from "react";
import OrderList from "./orders-list.component";
import {connect} from "react-redux";
import {Pagination} from "@material-ui/lab";
import {fetchOrderHistory} from "../../redux/orders/orders.actions";
import "./order-history.style.scss";
import Progress from "../common/progress.component";
import {Container, Typography} from "@material-ui/core";
import RoleConstrained from "./../common/role-constrained-container.component";
import OpsPage from "../error/ops-page.component";

const OrderHistoryPage = ({ orders, fetchOrderHistory, pageCount, currentPage, pending, error }) => {

    useEffect(() => {
        fetchOrderHistory()
    }, [fetchOrderHistory])

    const onPageChanged = (event, pageSelected) => {
        event.preventDefault()
        fetchOrderHistory(pageSelected)
    }

    if (error) {
        return (
            <Container maxWidth='md'>
                <OpsPage/>
            </Container>
        )
    } else if (pending) {
        return (
            <Progress loading={pending}/>
        )
    } else {
        return (
            <Container maxWidth='md'>
                <RoleConstrained role='admin'><Typography variant="h1" className="page-title">Order history</Typography></RoleConstrained>
                <RoleConstrained role='consumer'><Typography variant="h1" className="page-title">My orders</Typography></RoleConstrained>
                <OrderList orders={orders}/>
                <div className="order-pagination-conatiner">
                    <Pagination page={Number(currentPage)} count={pageCount} color='primary' onChange={onPageChanged}/>
                </div>
            </Container>
        )
    }

}

const mapStateToProps = state => {
    const { orders, pending, currentPage, pageCount, error } = state.orders.orderHistory
    return {
        orders,
        pending,
        currentPage,
        pageCount,
        error
    }
}


export default connect(mapStateToProps, { fetchOrderHistory })(OrderHistoryPage)