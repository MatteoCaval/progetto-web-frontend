import React from 'react';
import './App.scss';
import HelloUser from "./components/hellouser.component";
import {Switch, Route} from 'react-router-dom'
import SignIn from "./components/signin/signin.component";

function App() {
    return (
        <div className="App">
            <HelloUser/>
            <Switch>
                <Route exact path="/signin" component={SignIn}/>
            </Switch>
        </div>
    );
}

export default App;
