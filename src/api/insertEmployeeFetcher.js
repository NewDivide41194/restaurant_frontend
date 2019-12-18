import * as API from "./url";
export const InsertEmployeeFetcher = ({ EmployeeImage, EmployeeName, FatherName, DateOfBirth, NrcNo, JoinDate, DepartmentId, DesignationId, Education, Gender, MaritalStatus, Address, CreatedBy, CreatedDate, Active }, callback) => {
    console.log("DATA is ===>",EmployeeImage, EmployeeName, FatherName, DateOfBirth, NrcNo, JoinDate, DepartmentId, DesignationId, Education, Gender, MaritalStatus, Address, CreatedBy, CreatedDate, Active );
    
    fetch(API.InsertEmployeeFetcher, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ employeeImage:EmployeeImage, employeeName:EmployeeName, fatherName:FatherName, dateOfBirth:DateOfBirth, nrcNo:NrcNo, joinDate:JoinDate, departmentId:DepartmentId, designationId:DesignationId, education:Education, gender:Gender, maritalStatus:MaritalStatus, address:Address, createdBy:CreatedBy, createdDate:CreatedDate, active:Active }),
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