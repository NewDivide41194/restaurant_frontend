import React, { useEffect, useState } from "react";
import { RoleFetcher } from "../../../api/roleFetcher";
import Spinner from "../../../assets/icon/spinner.gif";

import MyButton from "../../../tools/myButton";
import UserRoleModal from "./userRoleModal";
import moment from "moment";
export default function RoleTable() {
  const [roleData, setRoleData] = useState([]);

  const [roleName, setRoleName] = useState("");
  const [Remark, setRemark] = useState("");
  const [active, setActive] = useState(0);
  const [roleId, setRoleId] = useState("");
  const userId = roleData.userId;
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(true);


  const onOpenModal = (e, index) => {
    if (index === undefined) {
      setOpen(true);
    } else {
      const role_data = roleData[index];
      console.log(role_data);
      setRoleName(role_data.roleName);
      setRemark(role_data.remark);
      setActive(role_data.active.data[0]);
      setRoleId(role_data.roleId);
      setOpen(true);
    }
  };

  const onCloseModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    RoleFetch();
  }, []);
  const RoleFetch = () => {
    RoleFetcher((err, data) => {
      setRoleData(data.payload);
      setLoading(false);

      console.log(data.payload);
    });
  };

  const _handleAddNew = () => {
    setOpen(true);
    setRoleName("");
    setRoleId("");
    setActive(1);
    setRemark("");
  };
  console.log();

  return (
    <div className="container">
      {open ? (
        <UserRoleModal
          open={open}
          onCloseModal={onCloseModal}
          roleName={roleName}
          remark={Remark}
          active={active}
          roleId={roleId}
        />
      ) : null}

      <MyButton
        className="my-2"
        text={"+ Add New User Role"}
        onClick={_handleAddNew}
        type={"submit"}
        style={{ borderRadius: 5, fontSize: 18 }}
      />
      {Loading ? (
        <div className="mx-auto text-white">
          <img
            src={Spinner}
            style={{ marginTop: "25%", width: 50, height: 50 }}
            alt="Loading"
          />
          <br />
          Loading . . .
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark text-light text-left">
            <thead>
              <tr>
                <th>SINO</th>
                <th>ROLE</th>
                <th>ACTIVE</th>
                <th>REMARK</th>
                <th>CREATED DATE</th>
                <th colSpan="2">CREATE BY</th>
              </tr>
            </thead>
            <tbody>
              {roleData.map((v, k) => (
                <tr key={k}>
                  <td>{k + 1}</td>
                  <td>{v.roleName}</td>
                  <td style={{ fontSize: 18 }}>
                    {v.active.data[0] === 1 ? (
                      <i className="fa fa-check-square" />
                    ) : (
                      <i className="fa fa-square" />
                    )}
                  </td>
                  <td>{v.remark}</td>
                  <td>{moment(v.createdDate).format("MM/DD/YYYY hh:mm A")}</td>
                  <td>{v.employeeName}</td>
                  <td>
                    <button
                      type={"button"}
                      onClick={() => onOpenModal(v, k)}
                      style={{
                        borderRadius: "8px",
                        backgroundColor: "#c7821c",
                        color: "white",
                        width: "80px"
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
