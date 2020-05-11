import React from 'react';
import './App.scss';
import HelloUser from "./components/hellouser.component";
import {Switch, Route} from 'react-router-dom'
import SignIn from "./components/signin/signin.component";
import MenuAppBar from "./components/appbar/menuappbar.component";
import Categories from "./pages/catalog/catalogpage.component";

function App() {
    return (
        <div className="App">
            <HelloUser/>
            <MenuAppBar />
            <Switch>
                <Route exact path="/signin" component={SignIn}/>
                <Route path='/' component={Categories} />
            </Switch>
        </div>
    );
}

export default App;
