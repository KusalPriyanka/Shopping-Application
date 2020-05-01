import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OpenIconSpeedDial from "./OpenIconSpeedDial";
import TopSearchAppBar from "./TopSearchAppBar";
import AllProducts from "./ProductView/AllProducts";
import AddProduct from "./AddProduct/AddProduct";

class StoreManagerDashBoard extends Component{

    render() {
        return (
            <React.Fragment>
                <Router>
                    <TopSearchAppBar/>
                    <Switch>
                        <Route path="/" exact component={AllProducts} />
                        <Route path="/addProducts" component={AddProduct} />
                    </Switch>
                    <OpenIconSpeedDial/>
                </Router>
            </React.Fragment>
        )
    }
}

export default StoreManagerDashBoard;
