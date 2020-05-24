import React from "react";
import MainProductView from "./MainProductView";
import Feedback from "../Feedback/Feedback";
import HomeNavigator from "../Shared/HomeNavigator";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const MainProductViewContainer = (props) => {
  const history = useHistory();
  const [userLogIn, setUserLogIn] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/login");
      setUserLogIn(false);
    }
    setUserLogIn(true);
  }, []);

  return (
    <React.Fragment>
      {userLogIn ? (
        <div>
          <MainProductView productId={props.match.params.id} />
          <Feedback productId={props.match.params.id} />
          <HomeNavigator />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default MainProductViewContainer;
