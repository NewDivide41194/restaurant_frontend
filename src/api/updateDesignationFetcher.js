import * as API from "./url";

export const UpdateDesignationFetcher = ({ DesignationId,Designation,Remark,Active }, callback) => {
    console.log(DesignationId,Designation,Remark,Active);
    
    fetch(API.UpdateDesignation, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ designationId:DesignationId,designation:Designation,remark:Remark,active:Active}),
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