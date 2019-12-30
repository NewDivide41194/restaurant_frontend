import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  position: positions.MIDDLE,
  timeout: 2000,
  offset: "30px",
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 1100
  }
};
ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options} >
    <App />
  </AlertProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
