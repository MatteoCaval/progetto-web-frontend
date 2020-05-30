import React from "react";
import OrderList from "./orders-list.component";
import { connect } from "react-redux";

const LiveUpdatedOrderList = ({}) => {


    return (
        <React.Fragment>
            <p>Live updated order list</p>
            <OrderList orders={[]}/>
        </React.Fragment>
    )

}

const mapStateToProps = state => {
    return {}
}


export default connect(mapStateToProps, {})(LiveUpdatedOrderList)