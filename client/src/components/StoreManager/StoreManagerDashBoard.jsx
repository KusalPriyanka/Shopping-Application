import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import OpenIconSpeedDial from "./OpenIconSpeedDial";
import TopSearchAppBar from "./TopSearchAppBar";
import AllProducts from "./ProductView/AllProducts";
import AddProduct from "./AddProduct/AddProduct";
import AllDiscounts from "./Discounts/AllDiscounts";
import UpdateProduct from "./UpdateProduct/UpdateProduct";

const StoreManagerDashBoard = ({ location }) => {

    const history = useHistory();
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const checkAuthentication = () => {
        if (!localStorage.getItem("emp")) {
            history.push("/employee")

        }
    }

    useEffect(() => {
        checkAuthentication();
        setCurrentPath(location.pathname);
    }, [currentPath]);


    return (
        <React.Fragment>
            <Router>
                <TopSearchAppBar/>
                <Switch>
                    <Route path="/storeManager" exact component={AllProducts}/>
                    <Route path="/storeManager/addProducts" component={AddProduct}/>
                    <Route path="/storeManager/updateProducts/:id" component={UpdateProduct}/>
                    <Route path="/storeManager/allDiscounts" component={AllDiscounts}/>
                </Switch>
                <OpenIconSpeedDial/>
            </Router>
        </React.Fragment>
    )

}

export default StoreManagerDashBoard;
