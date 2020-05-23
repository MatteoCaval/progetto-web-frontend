import React from 'react';
import './App.scss';
import { Redirect, Route, Switch } from 'react-router-dom'
import SignIn from "./components/signin/signin.component";
import MenuAppBar from "./components/appbar/menuappbar.component";
import Categories from "./components/catalog/catalogpage.component";
import CartPage from "./components/cart/cartpage.component";
import TimeTablePage from "./components/timetable/timetable.component";
import SignUp from "./components/signup/signup.component";
import { connect } from "react-redux";
import OrdersPage from "./components/orders/orders-list.component";
import CssBaseline from "@material-ui/core/CssBaseline";
import OrderSummaryPage from "./components/ordersummary/order-summary.component";
import CategoryForm from "./components/catalog/category/category-form.component";
import Alert from "./components/common/alert.component";


function App({ user }) {
    return (
        <React.Fragment>
            <CssBaseline/>
            <MenuAppBar/>
            <Switch>
                <Route exact path="/signin" render={() => user ? <Redirect to='/'/> : <SignIn/>}/>
                <Route exact path="/signup" render={() => user ? <Redirect to='/'/> : <SignUp/>}/>

                <Route exact path="/createcategory" component={CategoryForm}/>


                <Route exact path="/orders" render={() => user ? <OrdersPage/> : <Redirect to='/'/>}/>
                <Route exact path="/summary" render={() => user ? <OrderSummaryPage/> : <Redirect to='/'/>}/>
                <Route exact path='/cart' render={() => user ? <CartPage/> : <Redirect to='/signin'/>}/>
                <Route exact path='/timetable' render={() => user ? <TimeTablePage/> : <Redirect to='/signin'/>}/>

                <Route path='/' component={Categories}/>
            </Switch>
            <Alert/>

        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(App);
