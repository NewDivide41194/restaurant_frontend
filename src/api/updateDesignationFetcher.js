import * as API from "./url";

export const UpdateDesignationFetcher = ({ DesignationId,Designation,Remark,Active,UserId,token }, callback) => {
    console.log(DesignationId,Designation,Remark,Active);
    
    fetch(API.UpdateDesignation, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization":`Bearer ${token}`
      },
      body: JSON.stringify({ designationId:DesignationId,designation:Designation,remark:Remark,active:Active,userId:UserId}),
      cache: "no-cache"
    })
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          return response.json();
        }
        else{alert("Designation Name already Exist")}
      })
      .then(data => {
        console.log(data);
        callback(null, data);
      })
      .catch(err => console.log(err));
  };