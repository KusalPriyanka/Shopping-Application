import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import OpenIconSpeedDial from "./OpenIconSpeedDial";
import TopSearchAppBar from "./TopSearchAppBar";
import AllProducts from "./ProductView/AllProducts";
import AddProduct from "./AddProduct/AddProduct";
import AllDiscounts from "./Discounts/AllDiscounts";
import UpdateProduct from "./UpdateProduct/UpdateProduct";
import axios from "axios"

const StoreManagerDashBoard = ({location}) => {

    const history = useHistory();
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const checkAuthentication = () => {
        if (!localStorage.getItem("emp")) {
            history.push("/employee")
        } else {
            axios.defaults.headers.common["auth-token"] = JSON.parse(
                localStorage.getItem("emp")
            ).empToken;
        }
    }

    useEffect(() => {
        checkAuthentication();
        setCurrentPath(location.pathname);
    }, [currentPath]);

    const removeUser = () => {
        localStorage.removeItem("emp")
        history.push("/employee")
    }

    return (
        <React.Fragment>
            <Router>
                <TopSearchAppBar removeUser={removeUser}/>
                <Switch>
                    <Route path="/storeManager" exact component={() => <AllProducts removeUser={removeUser}/>}/>
                    <Route path="/storeManager/addProducts" component={() => <AddProduct removeUser={removeUser}/>}/>
                    <Route path="/storeManager/updateProducts/:id" component={UpdateProduct}/>
                    <Route path="/storeManager/allDiscounts" component={() => <AllDiscounts removeUser={removeUser}/>}/>
                </Switch>
                <OpenIconSpeedDial/>
            </Router>
        </React.Fragment>
    )

}

export default StoreManagerDashBoard;
