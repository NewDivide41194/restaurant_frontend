import React from "react";
import { withRouter } from "react-router-dom";

import MyInput from "../../../tools/myInput.js";
import MyButton from "../../../tools/myButton.js";
import MyLabel from "../../../tools/myLabel.js";

const Signin = (props) => {
  const{userName, password, visible,_handleSignIn,_handleUser,View,_handlePassword,bgstyle}=props
  return (
    <div className="d-flex align-items-center min-vh-100 text-left" style={{background: 'radial-gradient(circle, rgba(121,43,9,1) 0%, rgba(0,0,0,1) 100%)'}}>
      <div className='container'>
        <div className="col-lg-5 col-md-8 col-12 mx-auto ">
        <form className="py-4 pb-5 shadow" style={bgstyle} onSubmit={_handleSignIn}>
          <div
            className="pb-5 pt-5 text-center"
            style={{ fontSize: 35, color: "white" }}
          >
            SIGN IN
          </div>
          <div className="pr-4 pl-4 pb-3">
            <MyLabel text={"USER NAME"} />
            <MyInput
              id={"name"}
              style={{ fontColor: "#5A6367" }}              
              value={userName}
              onChange={_handleUser}
              // placeholder={'User name'}

            />
          </div>
          <div className="pr-4 pl-4 pb-3">
            <MyLabel text={"PASSWORD"} />
            <MyInput
              id={"password"}
              style={{ fontColor: "#5A6367" }}
              value={password}
              type={visible ? "text" : "password"}
              onChange={_handlePassword}
              // placeholder={'Password'}
            />
            <span style={{ float:"right", position: "relative", marginTop: "-55px", fontSize: "18px", marginRight:"20px", cursor: "pointer"}}
              onClick={View}>
                {visible? <i className="fa fa-eye py-4" /> : <i className="fa fa-eye-slash py-4" />}
            </span>
          </div>
          <div className="px-4 py-4 pb-5 w-100">
            <MyButton text={"SIGN IN"} type={"submit"} width="100%" />
          </div>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default withRouter(Signin);
