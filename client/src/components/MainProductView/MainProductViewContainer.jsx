import React from "react";
import MainProductView from "./MainProductView";
import Feedback from "../Feedback/Feedback";

const MainProductViewContainer = (props) => {
  return (
    <React.Fragment>
      <MainProductView productId={props.match.params.id} />
      <Feedback productId={props.match.params.id} />
    </React.Fragment>
  );
};

export default MainProductViewContainer;
