import React, { useEffect, useState } from "react";
import moment from "moment";

import { DepartmentFetcher } from "../../../api/departmentFetcher";
import MyButton from "../../../tools/myButton";
import DepartmentModal from "./departmentModal";
import Spinner from "../../../assets/icon/spinner.gif";

const DepartmentTable = () => {
  const [departmentData, setDepartmentData] = useState([]);

  const [department, setDepartment] = useState("");
  const [Remark, setRemark] = useState("");
  const [active, setActive] = useState(0);
  const [departmentId, setDepartmentId] = useState("");
  const userId = departmentData.userId;
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(true);

  const onOpenModal = (e, index) => {
    if (index === undefined) {
      setOpen(true);
    } else {
      const department_data = departmentData[index];
      console.log(department_data);
      setDepartment(department_data.department);
      setRemark(department_data.remark);
      setActive(department_data.active.data[0]);
      setDepartmentId(department_data.departmentId);
      setOpen(true);
    }
  };

  const onCloseModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    DepartmentFetch();
  }, []);
  const DepartmentFetch = () => {
    DepartmentFetcher((err, data) => {
      setDepartmentData(data.payload);
      setLoading(false);
      console.log(data.payload);
    });
  };

  const _handleAddNew = () => {
    setOpen(true);
    setDepartment("");
    setDepartmentId("");
    setActive(1);
    setRemark("");
  };
  console.log();

  return (
    <div className="container">
      {open ? (
        <DepartmentModal
          open={open}
          onCloseModal={onCloseModal}
          department={department}
          remark={Remark}
          active={active}
          departmentId={departmentId}
        />
      ) : null}
      <MyButton
        className="my-2"
        text={"+ Add New Department"}
        onClick={_handleAddNew}
        type={"submit"}
        style={{ borderRadius: 5, fontSize: 18 }}
      />
      {Loading ? (
        <div className="mx-auto text-white">
          <img
            src={Spinner}
            style={{ marginTop: "25%", width: 50, height: 50 }}
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
                <th>DEPARTMENT</th>
                <th>ACTIVE</th>
                <th>REMARK</th>
                <th>CREATED DATE</th>
                <th colSpan="2">CREATE BY</th>
              </tr>
            </thead>
            <tbody>
              {departmentData.map((v, k) => (
                <tr key={k}>
                  <td>{k + 1}</td>
                  <td>{v.department}</td>
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
};

export default DepartmentTable;
