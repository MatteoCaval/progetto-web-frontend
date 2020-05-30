import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import PaginatedOrderList from "./paginated-order-list.component";
import LiveUpdatedOrderList from "./live-updated-order-list.component";
import { connect } from "react-redux";
import UserRoles from "../../common/UserRoles";
import { AdminConstrained } from "../common/constrained-containers.component";

const getInitialTabValue = (userRole) => {
    switch (userRole) {
        case UserRoles.CONSUMER:
            return 1
        case UserRoles.RIDER:
            return 0
        default:
            return 0
    }
}


const OrdersPage = ({ userRole }) => {
    const [tabValue, setTabValue] = useState(getInitialTabValue(userRole))


    return (
        <React.Fragment>
            <AdminConstrained>
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
            </AdminConstrained>

            <Container maxWidth='md'>
                {/*first tab*/}
                <div hidden={tabValue !== 0}>
                    <LiveUpdatedOrderList/>
                </div>
                {/*second tab*/}
                <div hidden={tabValue !== 1}>
                    <PaginatedOrderList/>
                </div>
            </Container>
        </React.Fragment>
    )
}


const mapStateToProps = state => {
    const userRole = state.user.currentUser ? state.user.currentUser.role : null
    return {
        userRole
    }
}

export default connect(mapStateToProps)(OrdersPage)