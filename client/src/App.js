import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
import axios from "axios"



function App() {
  const [navBarStatus, setNavBarStatus] = useState(true);
  let [categories, setCategories] = useState([]);

  const getCategoryFromDB = () => {
    axios
        .get("http://localhost:8080/api/Categories/")
        .then((res) => {
          setCategories(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    getCategoryFromDB()
  }, []);

  const withOutHeader = (component) => {
    setNavBarStatus(false);
    if (component === "login") {
      return <LoginForm />;
    } else if (component === "register") {
      return <RegisterForm />;
    } else if (component === "admin") {
      return <Admin />;
    }else if (component === "storeManager") {
      return <StoreManagerDashBoard />;
    }
  };

  return (
    <div>
      <Router>
        {navBarStatus ? <Navigation categories={categories} /> : null}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={() => withOutHeader("login")} />
          <Route path="/register" component={() => withOutHeader("register")} />
          <Route path="/storeManager" component={() => withOutHeader("storeManager")} />
          <Route path="/mainProductViewContainer/:id" component={MainProductViewContainer} />
          <Route
            path="/category/:category"
            component={(props) => (
              <ProductByCategory {...props} key={window.location.pathname} />
            )}
          />
          <Route path="/shoppingCart" component={ShoppingCartContainer} />
          <Route path="/admin" component={() => withOutHeader("admin")} />
          <Route
            path="/wishList"
            component={() => <WishList  />}

          />

        </Switch>
      </Router>
    </div>
  );
}
export default App;
