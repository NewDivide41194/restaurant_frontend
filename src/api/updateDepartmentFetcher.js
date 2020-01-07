import * as API from "./url";

export const UpdateDepartmentFetcher = ({ DepartmentId,Department,Remark,Active,UserId,token }, callback) => {
    console.log(DepartmentId,Department,Remark,Active);
    
    fetch(API.UpdateDepartment, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization":`Bearer ${token}`
      },
      body: JSON.stringify({ departmentId:DepartmentId,department:Department,remark:Remark,active:Active,userId:UserId}),
      cache: "no-cache"
    })
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          return response.json();
        }
        else{alert("Department Name already Exist")}
      })
      .then(data => {
        console.log(data);
        callback(null, data);
      })
      .catch(err => console.log(err));
  };