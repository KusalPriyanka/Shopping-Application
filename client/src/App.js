import React, { useEffect, useState } from "react";
import { withRouter, Switch, Route, Link } from "react-router-dom";

import Navigation from "./components/Shared/Navigation";

import LoginForm from "./components/User/LoginForm";
import RegisterForm from "./components/User/RegisterForm";
import StoreManagerDashBoard from "./components/StoreManager/StoreManagerDashBoard";
import Home from "./components/Home/Home";
import ProductByCategory from "./components/StoreManager/ProductByCategory/ProductByCategory";
import Admin from "./components/Admin/Admin";
import ShoppingCartContainer from "./components/ShoppingCart/ShoppingCartContainer";
import WishList from "./components/Watchlist/WishList";
import MainProductViewContainer from "./components/MainProductView/MainProductViewContainer";
import EmployeeLogin from "./components/EmployeeLogin/EmployeeLogin";
import CheckoutTable from "./components/Checkout/CheckoutTable";
import axios from "axios";

function App({ location }) {
  let [categories, setCategories] = useState([]);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const getCategoryFromDB = () => {
    axios
      .get("http://localhost:8080/api/Categories/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategoryFromDB();
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const navBarVisibility = () => {
    if (
      currentPath === "/login" ||
      currentPath === "/register" ||
      currentPath === "/employee" ||
      currentPath === "/admin"
    ) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <Navigation categories={categories} visibility={navBarVisibility()} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/employee" component={EmployeeLogin} />
        <Route path="/storeManager" component={StoreManagerDashBoard} />
        <Route
          path="/mainProductViewContainer/:id"
          component={MainProductViewContainer}
        />
        <Route
          path="/category/:category"
          component={(props) => (
            <ProductByCategory {...props} key={window.location.pathname} />
          )}
        />
        <Route path="/shoppingCart" component={ShoppingCartContainer} />
        <Route path="/admin" component={Admin} />
        <Route
          path="/wishList"
          component={() => <WishList userID={"123456"} />}
        />
        <Route path="/checkout" component={CheckoutTable} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
