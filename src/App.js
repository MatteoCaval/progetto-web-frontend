import React, { useEffect } from 'react';
import './App.scss';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import SignIn from "./components/signin/signin.component";
import MenuAppBar from "./components/appbar/menuappbar.component";
import Categories from "./components/catalog/catalogpage.component";
import CartPage from "./components/cart/cartpage.component";
import TimeTablePage from "./components/timetable/timetable.component";
import SignUp from "./components/signup/signup.component";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import OrderSummaryPage from "./components/ordersummary/order-summary.component";
import CategoryForm from "./components/catalog/category/category-form.component";
import Alert from "./components/common/alert.component";
import { alertActions } from "./redux/alerts/alert.actions";
import RidersPage from "./components/rider/riders.component";
import PaginatedOrderList from "./components/orders/order-history.component";
import LiveUpdatedOrderList from "./components/orders/live-orders.component";
import { fetchCurrentUser } from "./redux/user/user.actions";

function App({ user, history, clearAlerts, fetchCurrentUser }) {

    useEffect(() => {
        history.listen((location, action) => {
            clearAlerts()
        })
        if (user) {
            fetchCurrentUser()
        }
    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            <MenuAppBar />
            <div className="main">
                <Switch>
                    <Route exact path="/signin" render={() => user ? <Redirect to='/' /> : <SignIn />} />
                    <Route exact path="/signup" render={() => user ? <Redirect to='/' /> : <SignUp />} />

                    <Route exact path="/createcategory" component={CategoryForm} />

                    <Route exact path='/riders'
                        render={() => (user && user.role === 'admin') ? <RidersPage /> : <Redirect to='/signin' />} />


                    <Route exact path="/orders" render={() => user ? <PaginatedOrderList /> : <Redirect to='/' />} />

                    <Route exact path="/live-orders"
                        render={() => (user && user.role !== 'consumer') ? <LiveUpdatedOrderList /> :
                            <Redirect to='/' />} />

                    <Route exact path="/summary" render={() => user ? <OrderSummaryPage /> : <Redirect to='/' />} />
                    <Route exact path='/cart'
                        render={() => (user && user.role === 'consumer') ? <CartPage /> : <Redirect to='/signin' />} />
                    <Route exact path='/timetable'
                        render={() => (user && user.role === 'admin') ? <TimeTablePage /> : <Redirect to='/signin' />} />

                    <Route path='/'
                        render={() => (!user || user.role !== 'rider') ? <Categories /> : <LiveUpdatedOrderList />} />
                </Switch>
            </div>
            <Alert />

        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user ? state.user.data : null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearAlerts: () => dispatch(alertActions.clear()),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
