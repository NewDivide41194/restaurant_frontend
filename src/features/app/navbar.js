import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { fsc } from "../../helper/fontControlHelper";
import withMedia from "react-media-query-hoc/dist/with-media";
import { NavInfoFetcher } from "../../api/navInfoFetcher";
import { useCookies } from "react-cookie";
import MyButton from "../../tools/myButton.js";

const NavBar = props => {
  const { media } = props;
  const [userInfo, setUserInfo] = useState([]);
  const [cookies, removeCookie] = useCookies(["token"]);
  const headerstyle = {
    zIndex: 5,
    top: 0,
    position: "fixed",
    background:' linear-gradient(to left, rgba(16,20,66,1) 0%, rgba(0,79,156,1) 100%)',
    width: "100%",
    // left: '50%',
    height: "70px"
  };
  const navstyle = {
    display: "flex",
    height: "100%",
    paddingTop: "10px",
    float: "right",
    paddingRight: "30px"
  };
  const UserInfoFetch = () => {
    NavInfoFetcher((err, data) => {
      setUserInfo(data.payload[0]);
    });
  };
  useEffect(() => {
    UserInfoFetch();
  }, []);

  const _handleLogout = () => {
    removeCookie("token");
    window.location.pathname = "/";
  };
  console.log(userInfo);
  return (
    <header style={headerstyle}>
      <nav style={navstyle}>
        {userInfo.map((v, k) => (
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              margin: 0,
              padding: 0
            }}
            key={k}
            className="pt-2"
          >
            <li className="pl-3 pt-2">
              <div
                onClick={() => alert("You have no new notification")}
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "white"
                }}
              >
                <i className="fa fa-bell" style={{ fontSize: 20 }}></i>
              </div>
            </li>
            <li className="pl-3" style={{ marginTop: "-8px" }}>
              <img
                src={`http://192.168.100.43:3001/uploads/${v.employeeImage}`}
                className="rounded-circle"
                style={{ width: 50, height: 50, border:"2px solid gray" }}
                alt="userprofile"
              />
            </li>
            <li className="pl-3">
              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    textTransform: "capitalize",
                    fontSize: fsc(media, 20),
                    background: "none"
                  }}
                >
                  {v.userName}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    minWidth: "30px",
                    marginRight: 30,
                    marginTop: media.mobile ? 10 : 15,
                    fontSize: fsc(media, 20)
                  }}
                >
                  <Dropdown.Item href="">{v.designation}</Dropdown.Item>
                  <Dropdown.Item onClick={_handleLogout}>LogOut</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        ))}
      </nav>
    </header>
  );
};

export default withMedia(NavBar);
