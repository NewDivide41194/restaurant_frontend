import * as API from "./url";

export const UpdateRoleFetcher = ({ RoleId,RoleName,Remark,Active }, callback) => {
    console.log(RoleId,RoleName,Remark,Active);
    
    fetch(API.UpdateRole, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ roleId:RoleId,roleName:RoleName,remark:Remark,active:Active}),
      cache: "no-cache"
    })
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          return response.json();
        }
        else{alert("Role Name already Exist")}
      })
      .then(data => {
        console.log(data);
        callback(null, data);
      })
      .catch(err => console.log(err));
  };