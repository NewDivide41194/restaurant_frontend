import React, { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import MyInput from "../../../tools/myInput";
import MyButton from "../../../tools/myButton";
import moment from "moment";
import {InsertDesignationFetcher} from "../../../api/insertDesignationFetcher";
import {UpdateDesignationFetcher} from "../../../api/updateDesignationFetcher"

const DesignationModal = props => {
  const {
    open,
    onCloseModal,
    designation,
    remark,
    active,
    designationId
  } = props;
  const CreatedDate = moment().format("YYYY-MM-DD HH:mm");
  const [Designation, setDesignation] = useState(designation);
  const [Remark, setRemark] = useState(remark);
  const [Active, setActive] = useState(active === 1 ? true : false);
  const [DesignationId, setDesignationId] = useState(designationId);
  const regex = /^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/ 

  const _handleAdd = (e) => {
    e.preventDefault()
    const isValid = regex.test(document.getElementById("designation").value);

    if (Designation === "") {
      alert("Please Fill Role Name");      
    } else if (!isValid) {
      alert("Contains Special Characters!");
  }else {
    InsertDesignationFetcher(
      { DesignationId, Designation, Remark, Active, CreatedDate },
      (err, data) => {
        if (data.payload === null) {
          alert("Designation Name Already Exist!");
        } else {
          window.location.reload();
        }
      }
    );
  };}

  const _handleUpdate = (e) => {
    e.preventDefault()
    const isValid = regex.test(document.getElementById("designation").value);

    if (Designation === "") {
      alert("Please Fill Role Name");      
    } else if (!isValid) {
      alert("Contains Special Characters!");
  }else {
    UpdateDesignationFetcher(
      { DesignationId, Designation, Remark, Active },
      (err, data) => {
        console.log(data);

        if (data.payload === null) {
          alert("Designation Name Already Exist!");
        } else {
          window.location.reload();
        }
      }
    );
  };}

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <form className="pt-2 col-lg-12 col-md-12 col-xs-4">
        <h4  className="text-center pt-4 pb-4">
        {DesignationId ? "Edit Designation" : "Add New Designation"}</h4>

        <div>
          <label>Designation</label>
        </div>
        <div className="pb-2">
          <MyInput
            className="w-100"
            id={"designation"}
            type={"text"}
            value={Designation}
            style={{ border: "1px solid gray" }}
            onChange={e => setDesignation(e.target.value)}
            maxLength={50}
          />
        </div>
        <div>
          <label>Remark</label>
        </div>
        <div className="pb-3">
          <MyInput
            className="w-100"
            type={"text"}
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
            text={DesignationId ? "UPDATE" : "ADD"}
            type={"submit"}
            onClick={DesignationId ? _handleUpdate : _handleAdd}
          />
        </div>
      </form>
    </Modal>
  );
};

export default DesignationModal;
