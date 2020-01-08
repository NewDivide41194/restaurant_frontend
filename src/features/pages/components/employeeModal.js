import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import Modal from "react-responsive-modal";
import moment from "moment";
import MyInput from "../../../tools/myInput";
import MyButton from "../../../tools/myButton";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { EmployeeFetcher } from "../../../api/employeeFetcher";
import { InsertEmployeeFetcher } from "../../../api/insertEmployeeFetcher";
import { UpdateEmployeeFetcher } from "../../../api/updateEmployeeFetcher";
import MyDropDown from "../../../tools/myDropDown";
const DefaultProfile = require("../../../assets/icon/profile/defaultProfile3.jpg");

const EmployeeModal = props => {
  const {
    open,
    onCloseModal,
    employeeName,
    active,
    employeeId,
    fatherName,
    dateOfBirth,
    nrcNo,
    joinDate,
    departmentId,
    designationId,
    education,
    gender,
    maritalStatus,
    address,
    createdBy,
    index,
    userId,
    employeeData,
    employeeImage,
    token
  } = props;

  const [EmployeeName, setEmployeeName] = useState(employeeName);
  const [FatherName, setFatherName] = useState(fatherName);
  const [EmployeeImage, setEmployeeImage] = useState(employeeImage);
  const [DateOfBirth, setDateOfBirth] = useState(
    moment(employeeId ? dateOfBirth : new Date()).format("YYYY-MM-DD")
  );
  const [JoinDate, setJoinDate] = useState(
    moment(employeeId ? joinDate : new Date()).format("YYYY-MM-DD")
  );
  const [NrcNo, setNrcNo] = useState(nrcNo);
  const [Education, setEducation] = useState(education);
  const [Gender, setGender] = useState(gender);
  const [MaritalStatus, setMaritalStatus] = useState(maritalStatus);
  const [Address, setAddress] = useState(address);
  const [EmployeeId, setEmployeeId] = useState(employeeId);
  const CreatedDate = moment().format("YYYY-MM-DD HH:mm");
  const [CreatedBy, setCreatedBy] = useState(createdBy);
  const [UserId, setUserId] = useState(userId);
  const [Active, setActive] = useState(active === 1 ? true : false);
  const [DesignationId, setDesignationId] = useState(designationId);
  const [DepartmentId, setDepartmentId] = useState(departmentId);

  const [DesignationData, setDesignationData] = useState([]);
  const [DepartmentData, setDepartmentData] = useState([]);

  const [empErr, setEmpErr] = useState("");
  const [fatherErr, setFatherErr] = useState("");
  const [nrcErr, setNrcErr] = useState("");
  const [educationErr, setEducationErr] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const [departmentErr, setDepartmentErr] = useState("");
  const [designationErr, setDesignationErr] = useState("");
  const [genderErr, setGenderErr] = useState("");
  const [maritalErr, setMaritalErr] = useState("");
  const [birthDateErr, setBirthDateErr] = useState("");
  const [image, setImage] = useState([]);
  console.log("EMP===>>>",employeeData);

  //const regex = /^(?=.{1,50}$)(?![_.0-9+=*;:,<>\?/|$&%^`~()])(?!.*[_.]{2})[a-zA-Z0-9._\'\"()-@& ]+(?<![_.+=*;:\?/|,$<>~`^$])$/;
  const regex = /[^!#$%*:;,/?+_<>={}"]+$/;
  const alert = useAlert();

  const MaritalOptions = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" }
  ];
  const designationOptions = DesignationData.map((v, k) => {
    return { value: v.value, label: v.label };
  });
  const departmentOptions = DepartmentData.map((v, k) => {
    return { value: v.value, label: v.label };
  });
  const GenderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" }
  ];
  const [selectedGender, setSelectedGender] = useState(
    employeeId === "" || employeeData[index].gender === ""
      ? { value: "", label: "Select Gender" }
      : employeeId && employeeData[index].gender === "Male"
      ? GenderOptions[0]
      : GenderOptions[1]
  );
  const [selectedDepartment, setSelectedDepartment] = useState(
    employeeId && {
      value: `${DepartmentId}`,
      label: `${employeeData[index].department}`
    }
  );
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState(
    employeeId === "" || employeeData[index].maritalStatus === ""
      ? { value: "", label: "Select MaritalStatus" }
      : employeeData[index].maritalStatus === "Single"
      ? MaritalOptions[0]
      : MaritalOptions[1]
  );
  const [selectedDesignation, setSelectedDesignation] = useState(
    employeeId && {
      value: `${DesignationId}`,
      label: `${employeeData[index].designation}`
    }
  );

  const EmployeeFetch = () => {
    EmployeeFetcher((err, data) => {
      setDepartmentData(data.payload[1]);
      setDesignationData(data.payload[2]);
    });
  };

  useEffect(() => {
    setSelectedDesignation();
    setSelectedDepartment();
    EmployeeFetch();
    EmployeeId
      ? setImage(`http://192.168.100.112:3001/uploads/${EmployeeImage}`)
      : setImage([]);
  }, []);

  const _UploadIMG = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setImage(reader.result);
        setEmployeeImage(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const _handleBirthDate = date => {
    setDateOfBirth(moment(date).format("YYYY-MM-DD"));
    //console.log(moment(date).format("YYYY-MM-DD"));
    document.getElementById("date-picker-dialog").style.border = "";
    setBirthDateErr("");
  };
  const _handleEmpName = e => {
    setEmployeeName(e.target.value);
    document.getElementById("employeeName").style.border = "";
    setEmpErr("");
  };
  const _handleFatherName = e => {
    setFatherName(e.target.value);
    document.getElementById("fatherName").style.border = "";
    setFatherErr("");
  };
  const _handleNRC = e => {
    setNrcNo(e.target.value);
    document.getElementById("nrcNo").style.border = "";
    setNrcErr("");
  };
  const _handleEducation = e => {
    setEducation(e.target.value);
    document.getElementById("education").style.border = "";
    setEducationErr("");
  };
  const _handleAddress = e => {
    setAddress(e.target.value);
    document.getElementById("address").style.border = "";
    setAddressErr("");
  };
  const _handleGender = e => {
    setGender(e.value);
    setSelectedGender(e);
    document.getElementById("gender").style = {
      border: "none"
    };
    setGenderErr("");
  };

  const _handleMaritial = e => {
    setMaritalStatus(e.value);
    setSelectedMaritalStatus(e);
    document.getElementById("maritalStatus").style = {
      border: "none"
    };
    setMaritalErr("");
  };

  const _handleDepartment = e => {
    setDepartmentId(e.value);
    setSelectedDepartment(e);
    document.getElementById("department").style = {
      border: "none"
    };
    setDepartmentErr("");
  };

  const _handleDesignation = e => {
    setDesignationId(e.value);
    setSelectedDesignation(e);
    document.getElementById("designation").style = {
      border: "none"
    };
    setDesignationErr("");
  };

  const _handleAdd = e => {
    e.preventDefault();
    const isValidName = regex.test(
      document.getElementById("employeeName").value
    );
    const isValidFather = regex.test(
      document.getElementById("fatherName").value
    );

    if (EmployeeName.trim() === "") {
      setEmpErr("Please Fill Employee Name");
      document.getElementById("employeeName").style.border = "1px solid red";
      return;
    } else if (!isValidName) {
      setEmpErr("Employee Name Contains Special Characters or Numbers!");
      document.getElementById("employeeName").style.border = "1px solid red";
      return;
    }

    if (FatherName.trim() === "") {
      setFatherErr("Please Fill Father Name");
      document.getElementById("fatherName").style.border = "1px solid red";
      return;
    } else if (!isValidFather) {
      setFatherErr("Father Name Contains Special Characters or Numbers!");
      document.getElementById("fatherName").style.border = "1px solid red";
      return;
    }
    if (moment(new Date()).year() - moment(DateOfBirth).year() <= 17) {
      setBirthDateErr("Age must be at least 18!");
      document.getElementById("date-picker-dialog").style.border =
        "1px solid red";
      return;
    }
    if (NrcNo.trim() === "") {
      setNrcErr("Please Fill NRC number");
      document.getElementById("nrcNo").style.border = "1px solid red";
      return;
    }
    if (Education.trim() === "") {
      setEducationErr("Please Fill Education");
      document.getElementById("education").style.border = "1px solid red";
      return;
    }
    if (DesignationId === "") {
      setDesignationErr("Please Fill Designation");
      document.getElementById("designation").style.border = "1px solid red";
      return;
    }
    if (DepartmentId === "") {
      setDepartmentErr("Please Fill Department");
      document.getElementById("department").style.border = "1px solid red";
      return;
    }
    if (Gender === "") {
      setGenderErr("Please Fill Gender");
      document.getElementById("gender").style.border = "1px solid red";
      return;
    }
    if (MaritalStatus === "") {
      setMaritalErr("Please Fill Marital Status");
      document.getElementById("maritalStatus").style.border = "1px solid red";
      return;
    }
    if (Address.trim() === "") {
      setAddressErr("Please Fill Address");
      document.getElementById("address").style.border = "1px solid red";
      return;
    } else {
      setDateOfBirth(moment(DateOfBirth).format("YYYY-MM-DD"));
      InsertEmployeeFetcher(
        {
          EmployeeImage,
          EmployeeName,
          FatherName,
          DateOfBirth,
          NrcNo,
          JoinDate,
          DepartmentId,
          DesignationId,
          Education,
          Gender,
          MaritalStatus,
          Address,
          UserId,
          CreatedDate,
          Active,
          token
        },
        (err, data) => {
          if (data.success === false && data.error === "E2601") {
            alert.error("Employee Name Already Exist!");
            return;
          } else if (data.success === false && data.error === "N2601") {
            alert.error("NRC Already Exist!");
            return;
          } else {
            alert.success("Employee Added!", {
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
    setDateOfBirth(moment(dateOfBirth).format("YYYY-MM-DD"));
    setJoinDate(moment(joinDate).format("YYYY-MM-DD"));
    const isValidName = regex.test(
      document.getElementById("employeeName").value
    );
    const isValidFather = regex.test(
      document.getElementById("fatherName").value
    );

    if (EmployeeName.trim() === "") {
      setEmpErr("Please Fill Employee Name");
      document.getElementById("employeeName").style.border = "1px solid red";
      return;
    } else if (!isValidName) {
      setEmpErr("Employee Name Contains Special Characters or Numbers!");
      document.getElementById("employeeName").style.border = "1px solid red";
      return;
    }
    if (FatherName.trim() === "") {
      setFatherErr("Please Fill Father Name");
      document.getElementById("fatherName").style.border = "1px solid red";
      return;
    } else if (!isValidFather) {
      setFatherErr("Father Name Contains Special Characters or Numbers!");
      document.getElementById("fatherName").style.border = "1px solid red";
      return;
    }
    if (Address.trim() === "") {
      setAddressErr("Please Fill Address");
      document.getElementById("address").style.border = "1px solid red";
      return;
    }
    if (NrcNo.trim() === "") {
      setNrcErr("Please Fill NRC number");
      document.getElementById("nrcNo").style.border = "1px solid red";
      return;
    }
    if (Education.trim() === "") {
      setEducationErr("Please Fill Education");
      document.getElementById("education").style.border = "1px solid red";
      return;
    }
    if (Gender === "") {
      setGenderErr("Please Fill Gender");
      document.getElementById("gender").style.border = "1px solid red";
      return;
    }
    if (MaritalStatus === "") {
      setMaritalErr("Please Fill Marital Status");
      document.getElementById("maritalStatus").style.border = "1px solid red";
      return;
    }
    if (DepartmentId === "") {
      setDepartmentErr("Please Fill Department");
      document.getElementById("department").style.border = "1px solid red";
      return;
    }
    if (DesignationId === "") {
      setDesignationErr("Please Fill Designation");
      document.getElementById("designation").style.border = "1px solid red";
      return;
    }
    if (moment(new Date()).year() - moment(DateOfBirth).year() <= 17) {
      setBirthDateErr("Age must be at least 18!");
      document.getElementById("date-picker-dialog").style.border =
        "1px solid red";
      return;
    } else {
      setDateOfBirth(moment(DateOfBirth).format("YYYY-MM-DD"));
      UpdateEmployeeFetcher(
        {
          EmployeeId,
          EmployeeImage,
          EmployeeName,
          FatherName,
          DateOfBirth,
          NrcNo,
          JoinDate,
          DepartmentId,
          DesignationId,
          UserId,
          Education,
          Gender,
          MaritalStatus,
          Address,
          CreatedBy,
          CreatedDate,
          Active,
          token
        },
        (err, data) => {
          if (data.success === false && data.error === "E2601") {
            alert.error("Employee Name Already Exist!");
            return;
          } else if (data.success === false && data.error === "N2601") {
            alert.error("NRC Number Already Exist!");
            return;
          } else {
            alert.success("Updated!", {
              onClose: () => {
                window.location.reload();
              }
            });
          }
        }
      );
      console.log(DateOfBirth);
    }
  };
  

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <form encType="multipart/form-data" autoComplete="off">
        <h4 className="text-center pt-2 pb-4">
          {employeeId ? "Edit Employee" : "Add New Employee"}
        </h4>
        <div className="pb-3 text-center">
          <div className="pb-3 pt-1 text-center">
            {EmployeeImage ? (
              <img
                style={{ height: "100px", width: "100px" }}
                src={image}
                alt={`${EmployeeImage}`}
              ></img>
            ) : (
              <img
                style={{ height: "100px", width: "100px" }}
                src={DefaultProfile}
                alt={`${EmployeeImage}`}
              ></img>
            )}
          </div>
          <input
            style={{ width: "100px" }}
            type="file"
            name="photo"
            id="in-btn"
            onChange={e => _UploadIMG(e)}
            accept="image/*"
          />
          <span className="new py-2 px-4" style={{}}>
            {EmployeeImage ? "Change Photo" : "Upload Photo"}
          </span>
        </div>

        <div className="row pb-2">
          <div className="col-lg-6 col-md-6">
            <label>Employee Name</label>
            <MyInput
              id={"employeeName"}
              className="w-100"
              type="text"
              value={EmployeeName}
              style={{ border: "1px solid gray" }}
              maxLength={50}
              onChange={_handleEmpName}
            />
            <div style={{ color: "red", fontSize: "11px" }}>{empErr}</div>
          </div>

          <div className="col-lg-6 col-md-6">
            <label>Father Name</label>
            <MyInput
              id={"fatherName"}
              className="w-100"
              type="text"
              value={FatherName}
              style={{ border: "1px solid gray" }}
              maxLength={200}
              onChange={_handleFatherName}
            />
            <div style={{ color: "red", fontSize: "11px" }}>{fatherErr}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <label>Date of Birth</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  format="dd/MM/yyyy"
                  value={DateOfBirth}
                  className="w-100"
                  onChange={_handleBirthDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <div style={{ color: "red", fontSize: "11px" }}>{birthDateErr}</div>
          </div>
          <div className="col-lg-6 col-md-6">
            <label>Join Date</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  format="dd/MM/yyyy"
                  value={JoinDate}
                  className="w-100"
                  onChange={date =>
                    setJoinDate(moment(date).format("YYYY-MM-DD"))
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
        </div>

        <div className="pb-2 row">
          <div className="col-lg-6 col-md-6">
            <label>NRC No.</label>
            <MyInput
              id={"nrcNo"}
              className="w-100"
              type="text"
              value={NrcNo}
              style={{ border: "1px solid gray" }}
              maxLength={200}
              onChange={_handleNRC}
            />
            <div style={{ color: "red", fontSize: "11px" }}>{nrcErr}</div>
          </div>
          <div className="col-md-6 col-lg-6">
            <label>Education</label>
            <MyInput
              id={"education"}
              className="w-100"
              type="text"
              value={Education}
              style={{ border: "1px solid gray" }}
              maxLength={200}
              onChange={_handleEducation}
            />
            <div style={{ color: "red", fontSize: "11px" }}>{educationErr}</div>
          </div>
        </div>

        <div className="row pb-3">
          <div className="col-md-6 col-lg-6 col-sm-6">
            <label>Designation</label>
            <br />
            <MyDropDown
              value={selectedDesignation}
              id={"designation"}
              onChange={e => _handleDesignation(e)}
              options={designationOptions}
            />
            <div style={{ color: "red", fontSize: "11px" }}>
              {designationErr}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <label>Department</label>
            <br />
            <MyDropDown
              id={"department"}
              value={selectedDepartment}
              defaultValue={selectedDepartment}
              onChange={e => _handleDepartment(e)}
              options={departmentOptions}
            />
            <div style={{ color: "red", fontSize: "11px" }}>
              {departmentErr}
            </div>
          </div>
        </div>

        <div className="row pb-2">
          <div className="col-md-6 col-lg-6 col-sm-6">
            <label>Gender</label>
            <br />
            <MyDropDown
              id={"gender"}
              value={selectedGender}
              onChange={e => _handleGender(e)}
              options={GenderOptions}
            />
            <div style={{ color: "red", fontSize: "11px" }}>{genderErr}</div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6">
            <label>Marital Status</label>
            <MyDropDown
              id={"maritalStatus"}
              value={selectedMaritalStatus}
              onChange={e => _handleMaritial(e)}
              options={MaritalOptions}
            />
            <div style={{ color: "red", fontSize: "11px" }}>{maritalErr}</div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6">
            <label>Address</label>
            <MyInput
              id={"address"}
              className="w-100"
              type="text"
              value={Address}
              style={{ border: "1px solid gray" }}
              maxLength={200}
              onChange={_handleAddress}
            />
            <div style={{ color: "red", fontSize: "11px" }}>{addressErr}</div>
          </div>
          <div className="col-lg-6 col-md-6 pt-3">
            <input
              type="checkbox"
              id="activecheck"
              value={Active}
              checked={Active === true ? true : false}
              onChange={e => setActive(!Active)}
            />
            <label>Active</label>
          </div>
        </div>

        <div className="pt-3 pb-3">
          <MyButton
            style={{
              backgroundImage:
                "linear-gradient(to left, rgba(16,20,66,1) 0%, rgba(0,79,156,1) 100%)",
              color: "white"
            }}
            className="w-100"
            text={EmployeeId ? "UPDATE" : "ADD"}
            type={"button"}
            onClick={EmployeeId ? _handleUpdate : _handleAdd}
          />
        </div>
      </form>
    </Modal>
  );
};
export default EmployeeModal;
