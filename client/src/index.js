import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <React.Fragment>
      <App />
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
