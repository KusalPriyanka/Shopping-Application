import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Navigation from "./components/Shared/Navigation";

import LoginForm from "./components/User/LoginForm";
import RegisterForm from "./components/User/RegisterForm";
import StoreManagerDashBoard from "./components/StoreManager/StoreManagerDashBoard";
import MainProductView from "./components/MainProductView/MainProductView";
import Home from "./components/Home/Home";
import ProductByCategory from "./components/StoreManager/ProductByCategory/ProductByCategory";

import CartView from "./components/CartItems/CartView";

function App() {

    let [categories, setCategories] = useState([]);

    useEffect( ()=>{
        setCategories(['Women Top', 'Men Top', 'Kids', 'Bags', 'Shoes'])
    }, [] );

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
                        <Route path="/mainProductView/:id" component={MainProductView}/>
                        <Route path="/category/:category" component={(props) => <ProductByCategory {...props} key={window.location.pathname}/>}/>
                        <Route path="/cartItems" component={CartView}/>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
