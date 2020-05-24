import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import OpenIconSpeedDial from "./OpenIconSpeedDial";
import TopSearchAppBar from "./TopSearchAppBar";
import AllProducts from "./ProductView/AllProducts";
import AddProduct from "./AddProduct/AddProduct";
import AllDiscounts from "./Discounts/AllDiscounts";
import UpdateProduct from "./UpdateProduct/UpdateProduct";
import axios from "axios"
import Swal from "sweetalert2";

const StoreManagerDashBoard = ({location}) => {

    const history = useHistory();
    const [currentPath, setCurrentPath] = useState(location.pathname);

    const alertMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

    const checkAuthentication = () => {
        if (!localStorage.getItem("emp")) {
            alertMsg("error", "Unauthorized User!", "Please Login To the System");
            history.push("/employee");
        } else {
            let role = JSON.parse(localStorage.getItem("emp")).path;

            if(role !== "storeManager"){
                alertMsg("error", "Unauthorized User!", "Please Login To the System");
                history.push("/employee")
            }

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
