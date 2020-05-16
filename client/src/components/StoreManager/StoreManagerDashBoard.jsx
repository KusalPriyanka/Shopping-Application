import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OpenIconSpeedDial from "./OpenIconSpeedDial";
import TopSearchAppBar from "./TopSearchAppBar";
import AllProducts from "./ProductView/AllProducts";
import AddProduct from "./AddProduct/AddProduct";
import AllDiscounts from "./Discounts/AllDiscounts";

class StoreManagerDashBoard extends Component{

    render() {
        return (
            <React.Fragment>
                <Router>
                    <TopSearchAppBar/>
                    <Switch>
                        <Route path="/storeManager" exact component={AllProducts} />
                        <Route path="/storeManager/addProducts" component={AddProduct} />
                        <Route path="/storeManager/allDiscounts" component={AllDiscounts} />
                    </Switch>
                    <OpenIconSpeedDial/>
                </Router>
            </React.Fragment>
        )
    }
}

export default StoreManagerDashBoard;
