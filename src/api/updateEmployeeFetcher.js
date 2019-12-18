import * as API from "./url";

export const UpdateEmployeeFetcher = ({ EmployeeId,EmployeeImage, EmployeeName, FatherName, DateOfBirth, NrcNo, JoinDate, DepartmentId, DesignationId, Education, Gender, MaritalStatus, Address, CreatedBy, CreatedDate, Active}, callback) => {
    console.log(EmployeeId,EmployeeImage, EmployeeName, FatherName, DateOfBirth, NrcNo, JoinDate, DepartmentId, DesignationId, Education, Gender, MaritalStatus, Address, CreatedBy, CreatedDate, Active);
    
    fetch(API.UpdateEmployeeFetcher, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ employeeId:EmployeeId,employeeImage:EmployeeImage, employeeName:EmployeeName, fatherName:FatherName, dateOfBirth:DateOfBirth, nrcNo:NrcNo, joinDate:JoinDate, departmentId:DepartmentId, designationId:DesignationId, education:Education, gender:Gender, maritalStatus:MaritalStatus, address:Address, createdBy:CreatedBy, createdDate:CreatedDate, active:Active }),
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