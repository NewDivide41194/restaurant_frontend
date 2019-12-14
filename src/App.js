import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRoute from "../src/AppRoute.js";
import { CookiesProvider } from "react-cookie";
import { MediaQueryProvider } from "react-media-query-hoc";

const App = () => {
  const Media = {
    mobile: "screen and  (max-width:767px)",
    tablet: "screen and (min-width:768px) and (max-width: 1024px)",
    desktop: "screen and (min-width:1025px) and (min-width: 1441px)"
  };

  return (
    <MediaQueryProvider queries={Media}>
      <CookiesProvider>
        <AppRoute />
      </CookiesProvider>
    </MediaQueryProvider>
  );
};

export default App;
