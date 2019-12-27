import * as API from "./url";
export const InsertEmployeeFetcher = (
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
    Active
  },
  callback
) => {
  console.log(
    "DATA is ===>",
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
    Active
  );
  let form = new FormData();
  form.append("employeeName", EmployeeName);
  form.append("employeeImage", EmployeeImage);
  form.append("fatherName", FatherName);
  form.append("dateOfBirth", DateOfBirth);
  form.append("NRC", NrcNo);
  form.append("joinDate", JoinDate);
  form.append("departmentId", DepartmentId);
  form.append("designationId", DesignationId);
  form.append("education", Education);
  form.append("gender", Gender);
  form.append("address", Address);
  form.append("userId", UserId);
  form.append("createdDate", CreatedDate);
  form.append("active", Active);
  form.append("maritalStatus", MaritalStatus);

  console.log(form);

  fetch(API.InsertEmployeeFetcher, {
    method: "POST",
    headers: {
      Accept: "*/*"
    },
    body: form
  })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        return response.json();
      }
    })
    .then(data => {
      console.log(data);
      callback(null, data);
    })
    .catch(err => console.log(err));
};
