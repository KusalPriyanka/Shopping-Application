import React from "react";
import MainProductView from "./MainProductView";
import Feedback from "../Feedback/Feedback";
import HomeNavigator from "../Shared/HomeNavigator";

const MainProductViewContainer = (props) => {
    return (
        <React.Fragment>
            <MainProductView productId={props.match.params.id}/>
            <Feedback productId={props.match.params.id}/>
            <HomeNavigator/>
        </React.Fragment>
    );
};

export default MainProductViewContainer;
