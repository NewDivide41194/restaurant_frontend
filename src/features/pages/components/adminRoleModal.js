import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import Modal from "react-responsive-modal";
import MyInput from "../../../tools/myInput";
import MyButton from "../../../tools/myButton";
import { InsertRoleFetcher } from "../../../api/insertRoleFetcher";
import { UpdateRoleFetcher } from "../../../api/updateRoleFetcher";
import Spinner from "../../../assets/icon/spinner.gif";
import moment from "moment";

const AdminRoleModal = props => {
  const { open, onCloseModal, roleName, remark, active, roleId,userId,token } = props;
  const CreatedDate = moment().format("YYYY-MM-DD HH:mm");
  const [RoleName, setRoleName] = useState(roleName);
  const [roleErr, setRoleErr] = useState("");
  const [Remark, setRemark] = useState(remark);
  const [Active, setActive] = useState(active === 1 ? true : false);
  const [RoleId, setRoleID] = useState(roleId);
 //const regex = /^(?=.{1,20}$)(?![_.0-9])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/;
  const [Loading, setLoading] = useState(false);
  const alert = useAlert();

  useEffect(() => {
  });

  const handleChangeRole = e => {
    const strRole = e.target.value;
    const roleChange = strRole.replace('"', "\''");
    setRoleName(roleChange);
  }
  const handleChangeRemark = e => {
    const strRemark = e.target.value;
    const remarkChange = strRemark.replace('"', "\''");
    setRemark(remarkChange);
  }
 
  const _handleAdd = e => {
    e.preventDefault();
    //setRoleName(RoleName.replace('"', "\''"));
    
    if (RoleName.trim() === "") {
      setRoleErr("Please Fill Role Name");
      document.getElementById("roleName").style.border = "1px solid red";
      return;
    }
     else {
      console.log('RoleName replace -> ' + RoleName);
      InsertRoleFetcher(
        { RoleId, RoleName, Remark, Active, CreatedDate,userId,token },
        (err, data) => {
          if (data.success===false) {
            setRoleErr("Role Name Already Exist!");
            document.getElementById("roleName").style.border = "1px solid red";
            return;
          } else {
            alert.success("Role Added!", {
              onClose: () => {
               window.location.reload();
              }
            });
          }
        }
      );
    }
  };

  const _handleUpdate = e => {
    e.preventDefault();
    //const isValid = regex.test(document.getElementById("roleName").value);

    if (RoleName.trim() === "") {
      setRoleErr("Please Fill Role Name");
    } 
    // else if (!isValid) {
    //   setRoleErr("Role Name Contains Special Characters!");
    // } 
    else {
      UpdateRoleFetcher({ RoleId, RoleName, Remark, Active,userId,token }, 
        (err, data) => {
        if (data.success === false) {
          setRoleErr("Role Name Already Exist!");
        } else {
          alert.success("Updated!", {
            onClose: () => {
              window.location.reload();
            }
          });
        }
      });
    }
  };
  
  return (
    <Modal open={open} onClose={onCloseModal} center>
      {Loading && (
        <div className="mx-auto text-white position-absolute">
          <img
            src={Spinner}
            style={{ marginTop: "25%", width: 50, height: 50 }}
            alt="spinner"
          />
          <br />
          Loading . . .
        </div>
      )}
      <div
        style={{
          color: "black"
        }}
      ></div>
      <form className="pt-2 col-lg-12 col-md-12 col-xs-4">
        <h4 className="text-center pt-4 pb-4">
          {RoleId ? "Edit User Role" : "Add New User Role"}
        </h4>

        <div>
          <label>Role Name</label>
        </div>
        <div className="pb-2">
          <MyInput
            className="w-100"
            type="text"
            id={"roleName"}
            value={RoleName}
            pattern={"[a-zA-Z0-9 ]+"}
            style={{ border: "1px solid gray" }}
            onChange={handleChangeRole}
            maxLength={50}
          />
          <div style={{ color: "red" }}>{roleErr}</div>
        </div>
        <div>
          <label>Remark</label>
        </div>
        <div className="pb-3">
          <MyInput
            className="w-100"
            type="text"
            value={Remark}
            style={{ border: "1px solid gray" }}
            onChange={handleChangeRemark}
            maxLength={200}
          />
        </div>
        <div className="pb-3">
          <input
            type="checkbox"
            id="activecheck"
            value={Active}
            checked={Active === true ? true : false}
            onChange={e => setActive(!Active)}
          />
          <label>Active</label>
        </div>
        <div className="pb-1">
          <MyButton
            style={{
              backgroundImage:
                "linear-gradient(to left, rgba(16,20,66,1) 0%, rgba(0,79,156,1) 100%)",
              color: "white"
            }}
            className="w-100"
            text={RoleId ? "UPDATE" : "ADD"}
            type={"submit"}
            onClick={RoleId ? _handleUpdate : _handleAdd}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AdminRoleModal;
