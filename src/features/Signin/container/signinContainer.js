import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Signin from "../components/signin.js";
import background from "../../../assets/images/background2.jpg";
import * as RoutePath from "../../../config/routeConfig.js";
import { LoginFetcher } from "../../../api/loginFetcher";

const SiginContainer = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);

  const _handleSignIn = e => {
    e.preventDefault();

    LoginFetcher({ userName, password }, (err, data) => {
      if (data.payload !== null) {
        setCookie("token", data.message, { path: "/" });
      }

      if (err) {
        console.log(err);
      }
      if (data.success === true) {
        props.history.push(`/${RoutePath.Dashboard}`);
      }
      if (data.success === false) {
        window.alert("User Name or Password Incorrect!");
        setUserName("");
        setPassword("");
        document.getElementById("name").focus();
      }
    });
  };
  const View = () => {
    setVisible(!visible);
  };

  const _handlePassword = e => {
    setPassword(e.target.value);
  };
  const _handleUser = e => {
    setUserName(e.target.value);
  };
  useEffect(() => document.getElementById("name").focus(), []);
  const bgstyle = {
    // paddingTop: media.mobile ? '5rem' : media.tablet ? '6rem' : '8rem',
    // paddingBottom: media.mobile ? "3rem" : media.tablet ? "7rem" : "7rem",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "550px",
    borderRadius: "10px"
  };

  return (
    <div className="text-center">
      <Signin
        userName={userName}
        password={password}
        visible={visible}
        _handleSignIn={_handleSignIn}
        _handleUser={_handleUser}
        View={View}
        _handlePassword={_handlePassword}
        bgstyle={bgstyle}
      />
    </div>
  );
};
export default SiginContainer;
