import React, { useEffect } from "react";
import OrderList from "./orders-list.component";
import { connect } from "react-redux";
import { startLiveOrderUpdated, stopLiveOrderUpdated } from "../../redux/orders/orders.actions";

const LiveUpdatedOrderList = ({ startLiveOrderUpdated, orders, stopLiveOrderUpdated }) => {

    useEffect(() => {
        startLiveOrderUpdated()
        return () => {
            stopLiveOrderUpdated()
        }
    }, [])


    return (
        <React.Fragment>
            <p>Live updated order list</p>
            <OrderList orders={orders}/>
        </React.Fragment>
    )

}

const mapStateToProps = state => {
    return {
        orders: state.orders.realTimeOrders
    }
}


export default connect(mapStateToProps, {
    startLiveOrderUpdated,
    stopLiveOrderUpdated
})(LiveUpdatedOrderList)