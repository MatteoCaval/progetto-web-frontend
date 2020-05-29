import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../redux/user/user.actions";
import { Container, Tab, Tabs } from "@material-ui/core";
import { connect } from "react-redux";
import OrderList from "./orders-list.component";
import AppBar from "@material-ui/core/AppBar";

const OrdersPage = ({ orders, fetchOrders }) => {

    const [tabValue, setTabValue] = useState(0)

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return (
        <React.Fragment>
            <AppBar position='static'>
                <Tabs
                    value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    indicatorColor="secondary"
                    textColor="secondary"
                    centered
                >
                    <Tab label='working'/>
                    <Tab label='history'/>
                </Tabs>
            </AppBar>

            <Container maxWidth='md'>
                {/*first tab*/}
                <div hidden={tabValue !== 0}>
                   <p>Primo tab</p>
                </div>
                {/*second tab*/}
                <div hidden={tabValue !== 1}>
                    <OrderList orders={orders}/>
                </div>
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