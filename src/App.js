import React from 'react';
import './App.scss';
import HelloUser from "./components/hellouser.component";
import {Switch, Route} from 'react-router-dom'
import SignIn from "./components/signin/signin.component";
import MenuAppBar from "./components/appbar/menuappbar.component";
import Categories from "./components/catalog/categories/categoriespage.component";

function App() {
    return (
        <div className="App">
            <HelloUser/>
            <MenuAppBar />
            <Switch>
                <Route exact path='/' component={Categories} />
                <Route exact path="/signin" component={SignIn}/>
            </Switch>
        </div>
    );
}

export default App;
