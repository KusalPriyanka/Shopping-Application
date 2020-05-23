import React from "react";

import TopImageSlider from "./TopImageSlider";
import HomeNavigator from "../Shared/HomeNavigator";
import HomeProductView from "./HomeProductView";

const Home = () => {
  return (
    <React.Fragment>
      <TopImageSlider />
      <HomeNavigator />
      <HomeProductView />
    </React.Fragment>
  );
};

export default Home;
