import React, { useEffect } from "react";
import OrderList from "./orders-list.component";
import { connect } from "react-redux";
import Config from "../../config";
import io from "socket.io-client";
import { newOrderReceived, orderUpdated, realTimeOrders } from "../../redux/orders/orders.actions";

const LiveUpdatedOrderList = ({ orders, realTimeOrders, newOrderReceived, orderUpdated }) => {

    useEffect(() => {
        //valutare se è buona pratica spostare nelle action come per le chiamata api
        const client = io.connect(Config.API_BASE_URL)
        client.on('orders', orders => {
            realTimeOrders(orders)
        })
        client.on('newOrder', order => {
            newOrderReceived(order)
        })
        client.on('orderUpdated', order => {
            orderUpdated(order)
        })
        return () => {
            console.log('pulire qui, chiudere socket o lanciare azione per chiudere socket')
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


export default connect(mapStateToProps, { realTimeOrders, newOrderReceived, orderUpdated })(LiveUpdatedOrderList)