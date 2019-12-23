import React, { useEffect,useState } from 'react'
import moment from 'moment'
import Sidebar from '../../app/sidebar.js'
import MyButton from '../../../tools/myButton.js'
import { EmployeeFetcher } from '../../../api/employeeFetcher';
import EmployeeModal from './employeeModal'
import Spinner from '../../../assets/icon/spinner.gif'


const EmployeeTable =props=>{
  const [employeeData, setEmployeeData]= useState([]);
  const [departmentData,setDepartmentData]=useState([])
  const [Image, setImage]= useState([]);
  const [employeeId,setEmployeeId]=useState(null)
  const [employeeName, setEmployeeName]= useState(null);
  const [employeeImage, setEmployeeImage]= useState(null);
  const [active, setActive]= useState(0);
  const [fatherName, setFatherName]= useState(null);
  const [dateOfBirth, setDateOfBirth]= useState(null);
  const [nrcNo, setNrcNo]= useState(null);
  const [joinDate, setJoinDate]= useState(null);
  const [departmentId, setDepartmentId]= useState(null);
  const [designationId, setDesignationId]= useState(null);
  const [education, setEducation]= useState(null);
  const [gender, setGender]= useState(null);
  const [maritalStatus, setMaritalStatus]= useState(null);
  const [address, setAddress]= useState(null);
  const [createdBy, setCreatedBy]= useState(null);
  const [createdDate, setCreatedDate]= useState(null);
  const [userId, setUserId]= useState(null);
  const [open, setOpen]=useState(false);
  const [Loading, setLoading]= useState(true);

  const [index, setIndex] = useState(-1);
  const DefaultProfile=require('../../../assets/icon/profile/defaultProfile3.jpg')


  const _handleEdit = (e, index) =>{
    setIndex(index)
    if(index===undefined){
      setOpen(true);
    }else{
     const employee_Data=employeeData[index];
      setEmployeeName(employee_Data.employeeName);
      setEmployeeImage(employee_Data.employeeImage);
      setActive(employee_Data.active);
      setFatherName(employee_Data.fatherName);
      setDateOfBirth(employee_Data.dateOfBirth);
      setNrcNo(employee_Data.nrcNo);
      setJoinDate(employee_Data.joinDate);
      setDepartmentId(employee_Data.departmentId);
      setDesignationId(employee_Data.designationId);
      setEducation(employee_Data.education);
      setGender(employee_Data.gender);
      setMaritalStatus(employee_Data.maritalStatus);
      setAddress(employee_Data.address);
      setCreatedBy(employee_Data.createdBy);
      setCreatedDate(employee_Data.createdDate);
      setEmployeeId(employee_Data.employeeId)
      setUserId(employee_Data.userId)
      setOpen(true);

      //16 Columns

    }
  };
  console.log("IMG==>",employeeImage);

  const onCloseModal =()=>{
    setOpen(false);
  };  
  const EmployeeFetch=()=>{
      EmployeeFetcher((err,data)=>{
      setEmployeeData(data.payload[0]);
      setLoading(false);
    });
  };
  useEffect(()=>{
    EmployeeFetch()
    
  },[]);

  const _handleAddNew=()=>{
    setIndex(-1)
    setOpen(true);
    setEmployeeName("");
    setEmployeeImage("")
    setActive(1);
    setEmployeeId("");
    setFatherName("");
    setDateOfBirth("");
    setNrcNo("");
    setJoinDate("");
    setDepartmentId(employeeData[0].departmentId);
    setDesignationId(employeeData[0].designationId);
    setEducation("");
    setGender(employeeData[0].gender);
    setMaritalStatus(null);
    setAddress("");
    setCreatedBy("");
    setCreatedDate("");
    setUserId(employeeData[0].userId)
  };
 
  console.log("Image Is====>",employeeImage);
  console.log("Employee Data=>",employeeData);

  
    return(
<div>
    <Sidebar />
    <div className='py-5' style={{paddingLeft:100,paddingRight:20}}>
      {open?(
        <EmployeeModal
        open={open} 
        onCloseModal={onCloseModal}
        employeeName={employeeName}
        active={active}
        employeeId={employeeId}
        fatherName={fatherName}
        dateOfBirth={dateOfBirth}
        nrcNo={nrcNo}
        joinDate={joinDate}
        departmentId={departmentId}
        designationId={designationId}
        education={education}
        gender={gender}
        maritalStatus={maritalStatus}
        address={address}
        createdBy={createdBy}
        createdDate={createdDate}
        index={index}
        employeeData={employeeData}
        employeeImage={employeeImage}
        userId={userId}
        />
      ):null}
        <MyButton
            className="my-2"
            text={"+ Add New Employee"}
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
      ):(
          <div className='table-responsive'>
            <table className="table table-dark text-light text-left">
              <thead>
              <tr><th>SrNo</th>
                  <th style={{maxwidth:'70px'}}>Employee Image</th>
                  <th>Employee Name</th>
                  <th>Active</th>
                  <th>Father Name</th>
                  <th>DateOfBirth</th>
                  <th>NRC No</th>
                  <th>Join Date</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Education</th>
                  <th>Gender</th>
                  <th>MartialStatus</th>
                  <th>Address</th>
                  <th>CREATE BY</th>
                  <th>CreatedDate</th>
                 
              </tr>
              </thead>
              <tbody>
            {employeeData.map((v, k) => (
              <tr key={k}>
                  <td>{k + 1}</td>
                  <td>
                    <div style={{width:50,height:60,overflow:'hidden'}}>
                    <img className='img-fluid'
                          src={v.employeeImage?`http://192.168.100.39:3001/uploads/${v.employeeImage}`:DefaultProfile}
                          id={v.id}
                          alt="styles"
                        />
                      </div>
                      </td>
                  <td>{v.employeeName}</td>
                  <td style={{ fontSize: 18 }}>
                    {v.active === 1 ? (
                      <i className="fa fa-check-square" />
                    ) : (
                      <i className="fa fa-square" />
                    )}
                  </td>
                  <td>{v.fatherName}</td>
                  <td>{moment(v.dateOfBirth).format("MM/DD/YYYY")}</td>
                  <td>{v.nrcNo}</td>
                  <td>{moment(v.joinDate).format("MM/DD/YYYY")}</td>
                  <td>{v.department}</td>
                  <td>{v.designation}</td>
                  <td>{v.education}</td>
                  <td>{v.gender}</td>
                  <td>{v.maritalStatus}</td>
                  <td>{v.address}</td>
                  <td>{v.createdBy}</td>
                  <td>{moment(v.createdDate).format("MM/DD/YYYY hh:mm A")}</td>
                  <td>
                  <button
                    type={"button"}
                    onClick={() => _handleEdit(v, k)}
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
        </div>
    )
}
export default EmployeeTable