import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Navigation from "./components/Shared/Navigation";

import LoginForm from "./components/User/LoginForm";
import RegisterForm from "./components/User/RegisterForm";
import StoreManagerDashBoard from "./components/StoreManager/StoreManagerDashBoard";
import Home from "./components/Home/Home";

function App() {
    return (
        <div>
            <div>
                <Router>
                    <Navigation/>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/storeManager" component={StoreManagerDashBoard}/>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
