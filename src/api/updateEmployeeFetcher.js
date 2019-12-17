import * as API from "./url";

export const UpdateEmployeeFetcher = ({ EmployeeId,ImgUrl, EmployeeName, Active, FatherName, DateOfBirth, NrcNo, JoinDate, DepartmentId, DesignationId, Education, Gender, MartialStatus, Address, CreatedBy, CreatedDate }, callback) => {
    console.log(EmployeeId,ImgUrl, EmployeeName, Active, FatherName, DateOfBirth, NrcNo, JoinDate, DepartmentId, DesignationId, Education, Gender, MartialStatus, Address, CreatedBy, CreatedDate );
    
    fetch(API.UpdateEmployee, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ employeeId:EmployeeId,ImgUrl:ImgUrl, employeeName:EmployeeName, active:Active, fathername:FatherName, dateOfBirth:DateOfBirth, nrcNo:NrcNo, joinDate:JoinDate, departmentId:DepartmentId, designationID:DesignationId, education:Education, gender:Gender, martialStatus:MartialStatus, address:Address, createdBy:CreatedBy, createdDate:CreatedDate }),
      cache: "no-cache"
    })
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          return response.json();
        }
        else{alert("Employee Name already Exist")}
      })
      .then(data => {
        console.log(data);
        callback(null, data);
      })
      .catch(err => console.log(err));
  };