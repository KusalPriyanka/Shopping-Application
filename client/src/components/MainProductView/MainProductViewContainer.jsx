import React from "react";
import MainProductView from "./MainProductView";

const MainProductViewContainer = (props) => {
    return(
        <React.Fragment>
            <MainProductView productId={props.match.params.id}/>
            <h1>FeedBacks</h1>
        </React.Fragment>
    )
}

export default MainProductViewContainer;
