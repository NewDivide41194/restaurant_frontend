import * as API from "./url";
export const InsertDepartmentFetcher = ({ DepartmentId,Department,Remark,Active,CreatedDate }, callback) => {
    console.log("DATA is ===>",Remark,Active,Department,CreatedDate);
    
    fetch(API.InsertDepartment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ departmentId:DepartmentId,department:Department,remark:Remark,active:Active,createdDate:CreatedDate }),
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