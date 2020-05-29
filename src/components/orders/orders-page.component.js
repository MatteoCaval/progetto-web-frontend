import React, { useState } from "react";
import { Container, Tab, Tabs } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import PaginatedOrderList from "./paginated-order-list.component";
import LiveUpdatedOrderList from "./live-updated-order-list.component";

const OrdersPage = () => {
    const [tabValue, setTabValue] = useState(0)

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


export default OrdersPage