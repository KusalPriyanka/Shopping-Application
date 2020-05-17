import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Shared/Navigation";

import LoginForm from "./components/User/LoginForm";
import RegisterForm from "./components/User/RegisterForm";
import StoreManagerDashBoard from "./components/StoreManager/StoreManagerDashBoard";
import MainProductView from "./components/MainProductView/MainProductView";
import Home from "./components/Home/Home";
import ProductByCategory from "./components/StoreManager/ProductByCategory/ProductByCategory";
import Admin from "./components/Admin/Admin";
import CartView from "./components/CartItems/CartView";
import WishList from "./components/Watchlist/WishList";

function App() {
  const [navBarStatus, setNavBarStatus] = useState(true);
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(["Women Top", "Men Top", "Kids", "Bags", "Shoes"]);
  }, []);

  const withOutHeader = (component) => {
    setNavBarStatus(false);
    if (component === "login") {
      return <LoginForm />;
    } else if (component === "register") {
      return <RegisterForm />;
    } else if (component === "admin") {
      return <Admin />;
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
          <Route path="/storeManager" component={StoreManagerDashBoard} />
          <Route path="/mainProductView/:id" component={MainProductView} />
          <Route
            path="/category/:category"
            component={(props) => (
              <ProductByCategory {...props} key={window.location.pathname} />
            )}
          />
          <Route path="/cartItems" component={CartView} />
          <Route path="/admin" component={() => withOutHeader("admin")} />
          <Route
            path="/wishList"
            component={() => <WishList userID={"123456"} />}
          />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
