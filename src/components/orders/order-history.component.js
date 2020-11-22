import React, {useEffect} from "react";
import OrderList from "./orders-list.component";
import {connect} from "react-redux";
import {Pagination} from "@material-ui/lab";
import {fetchOrderHistory} from "../../redux/orders/orders.actions";
import {Container} from "@material-ui/core";
import "./order-history.style.scss";
import Progress from "../common/progress.component";

const OrderHistoryPage = ({ orders, fetchOrderHistory, pageCount, currentPage, pending, error }) => {

    useEffect(() => {
        fetchOrderHistory()
    }, [fetchOrderHistory])

    const onPageChanged = (event, page) => {
        event.preventDefault()
        fetchOrderHistory(page)
    }

    if (error) {
        return (
            // TODO visualizzazione migliore errore
            <p>{error.description}</p>
        )
    } else if (pending) {
        return (
            <Progress loading={pending}/>
        )
    } else {
        return (
            <Container maxWidth='md'>
                <OrderList orders={orders}/>
                <div className="order-pagination-conatiner">
                    <Pagination page={currentPage} count={pageCount} color='primary' onChange={onPageChanged}/>
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