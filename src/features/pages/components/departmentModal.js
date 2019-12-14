import React, { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import MyInput from "../../../tools/myInput";
import MyButton from "../../../tools/myButton";
import {
  InsertDepartmentFetcher,
  UpdateDepartmentFetcher
} from "../../../api/apiFetcher";
import moment from "moment";

const DepartmentModal = props => {
  const {
    open,
    onCloseModal,
    department,
    remark,
    active,
    departmentId
  } = props;
  const CreatedDate = moment().format("YYYY-MM-DD HH:mm");
  const [Department, setDepartment] = useState(department);
  const [Remark, setRemark] = useState(remark);
  const [Active, setActive] = useState(active === 1 ? true : false);
  const [DepartmentId, setDepartmentID] = useState(departmentId);
  const regex = /^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/ 

  const _handleAdd = e => {
    e.preventDefault();    
    const isValid = regex.test(document.getElementById("department").value);
    
    if (Department === "") {
      alert("Please Fill Role Name");
    } else if (!isValid) {
      alert("Contains Special Characters!");
  }else {
      console.log("DATA IS ==>", Department, Remark, Active, CreatedDate);
      InsertDepartmentFetcher(
        { DepartmentId, Department, Remark, Active, CreatedDate },
        (err, data) => {
          if (data.payload === null) {
            alert("Department Name Already Exist!");
          } else{
            window.location.reload();
          }
        }
      );
    }
  };

  const _handleUpdate = e => {
    e.preventDefault();
    const isValid = regex.test(document.getElementById("department").value);

    if (Department === "") {
      alert("Please Fill Role Name");      
    } else if (!isValid) {
      alert("Contains Special Characters!");
  }else {
    UpdateDepartmentFetcher(
      { DepartmentId, Department, Remark, Active },
      (err, data) => {
        console.log(data);

        if (data.payload === null) {
          alert("Department Name Already Exist!");
        } else {
          window.location.reload();
        }
      }
    );
  };}
  console.log(Active);

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div
        style={{
          color: "black"
        }}
      ></div>
      <form className="form pt-2 col-lg-12 col-md-12 col-xs-4">
        <h4 className="text-center pt-4 pb-4">
          {DepartmentId ? "Edit Department" : "Add New Department"}
        </h4>

        <div>
          <label>Department Name</label>
        </div>
        <div className="pb-2">
          <MyInput
            className="w-100"
            id={'department'}
            type="text"
            value={Department}
            pattern={"[A-Za-z]{3}"}
            style={{ border: "1px solid gray" }}
            onChange={e => setDepartment(e.target.value)}
            maxLength={50}
          />
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
            onChange={e => setRemark(e.target.value)}
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
            text={DepartmentId ? "UPDATE" : "ADD"}
            type={"submit"}
            onClick={DepartmentId ? _handleUpdate : _handleAdd}
          />
        </div>
        <div></div>
      </form>
    </Modal>
  );
};

export default DepartmentModal;
