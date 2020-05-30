import React, { useEffect } from "react";
import OrderList from "./orders-list.component";
import { fetchUserOrders } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { Pagination } from "@material-ui/lab";
import { fetchOrderHistory } from "../../redux/orders/orders.actions";
import UserRoles from "../../common/UserRoles";

const PaginatedOrderList = ({ orders, fetchUserOrders, fetchOrderHistory, userRole, pageCount, currentPage, pending }) => {

    useEffect(() => {
        switch (userRole) {
            case UserRoles.CONSUMER: {
                console.log(userRole)
                fetchUserOrders()
            }
            case UserRoles.ADMIN: {
                console.log(userRole)
                fetchOrderHistory()
            }
        }
    }, [])

    const onPageChanged = (event, page) => {
        event.preventDefault()
        fetchOrderHistory(page)
    }

    return (
        <React.Fragment>
            <p>Paginated order list</p>
            <OrderList orders={orders}/>
            <Pagination page={currentPage} count={pageCount} color='primary' onChange={onPageChanged}/>
        </React.Fragment>
    )

}

const mapStateToProps = state => {
    const userRole = state.user.currentUser ? state.user.currentUser.role : null
    switch (userRole) {
        case UserRoles.ADMIN: {
            const { orders, pending, currentPage, pageCount } = state.orders.orderHistory
            return {
                userRole,
                orders,
                pending,
                currentPage,
                pageCount
            }
        }
        case UserRoles.CONSUMER: {
            return {
                userRole,
                orders: state.user.orders,
                currentPage: 1,
                pageCount: 1,
            }
        }
        default:
            return {}
    }
}

export default connect(mapStateToProps, { fetchUserOrders, fetchOrderHistory })(PaginatedOrderList)