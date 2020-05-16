import React from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom'
import SignIn from "./components/signin/signin.component";
import MenuAppBar from "./components/appbar/menuappbar.component";
import Categories from "./components/catalog/catalogpage.component";
import CartPage from "./components/cart/cartpage.component";
import SignUp from "./components/signup/signup.component";
import { connect } from "react-redux";
import OrdersPage from "./components/orders/orders-page.component";


function App({ user }) {
    return (
        <div>
            <MenuAppBar/>
            <Switch>
                <Route exact path="/signin" render={() => user ? <Redirect to='/'/> : <SignIn/>}/>
                <Route exact path="/signup" render={() => user ? <Redirect to='/'/> : <SignUp/>}/>

                <Route exact path="/orders" render={() => user ? <OrdersPage/> : <Redirect to='/'/>}/>
                <Route exact path='/cart' render={() => user ? <CartPage/> : <Redirect to='/signin'/>}/>
                <Route path='/' component={Categories}/>
            </Switch>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(App);
