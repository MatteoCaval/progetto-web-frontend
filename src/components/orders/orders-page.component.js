import React, { useEffect } from "react";
import { fetchOrders } from "../../redux/user/user.actions";
import { Container, Tab, Tabs } from "@material-ui/core";
import { connect } from "react-redux";
import OrderList from "./orders-list.component";
import AppBar from "@material-ui/core/AppBar";

const OrdersPage = ({ orders, fetchOrders }) => {
    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return (
        <React.Fragment>
            {/*<AppBar position='static'>*/}
            {/*    <Tabs*/}
            {/*        indicatorColor="inherit"*/}
            {/*        textColor="inherit"*/}
            {/*        centered*/}
            {/*    >*/}
            {/*        <Tab label='working'/>*/}
            {/*        <Tab label='history'/>*/}
            {/*    </Tabs>*/}
            {/*</AppBar>*/}

            <Container maxWidth='md'>
                <OrderList orders={orders}/>
            </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage)