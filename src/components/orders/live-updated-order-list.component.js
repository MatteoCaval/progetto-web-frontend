import React, { useEffect, useState } from "react";
import OrderList from "./orders-list.component";
import { connect } from "react-redux";
import Config from "../../config";
import io from "socket.io-client";

const LiveUpdatedOrderList = ({}) => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        console.log('init io')
        const client = io.connect(Config.API_BASE_URL)
        client.on('prova', msg => console.log(msg))
        client.on('orders', orders => {
            console.log(orders)
            setOrders(orders)
        })
    }, [])

    return (
        <React.Fragment>
            <p>Live updated order list</p>
            <OrderList orders={orders}/>
        </React.Fragment>
    )

}

const mapStateToProps = state => {
    return {}
}


export default connect(mapStateToProps, {})(LiveUpdatedOrderList)