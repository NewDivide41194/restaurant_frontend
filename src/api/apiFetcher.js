import * as API from "./url";

export const LoginFetcher = ({ userName, password }, callback) => {
  fetch(API.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache",
    body: JSON.stringify({ userName: userName, password: password })
  })
    .then(response => {
      console.log(response.status);
      if (response.status === 200) {
        // console.log(response);
        return response.json();
      } else {
        window.alert("Something Wrong");
      }
    })
    .then(data => {
      console.log(data);

      callback(null, data);
    })
    .catch(err => console.log(err));
};

export const NavInfoFetcher = callback => {
  fetch(API.NAV, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNTc2Mjk3Mzk0LCJleHAiOjE1NzYzODM3OTR9.QHdD4M8h0u58AlpWPe0by2Vr04eE2JP6JGuOaecyIXY"
    },
    cache: "no-cache"
  })
    .then(response => {
      if (response.status === 200) {
        console.log(response);
        return response.json();
      }
    })
    .then(data => {
      // console.log(data);

      callback(null, data) })
    .catch(err => console.log(err));
};

export const RoleFetcher = callback => {
  fetch(API.ROLE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache"
  })
    .then(response => {
      if (response.status === 200) {
        // console.log(response);
        return response.json();
      }
    })
    .then(data => {
      console.log(data);

      callback(null, data);
    })
    .catch(err => console.log(err));
};

export const InsertRoleFetcher = ({ RoleId,RoleName,Remark,Active,CreatedDate }, callback) => {
  console.log("DATA is ===>",Remark,Active,RoleName,CreatedDate);
  
  fetch(API.InsertRole, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ roleId:RoleId,roleName:RoleName,remark:Remark,active:Active,createdDate:CreatedDate }),
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

export const DepartmentFetcher = callback => {
  fetch(API.DepartmentFetcher, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache"
  })
    .then(response => {
      if (response.status === 200) {
        // console.log(response);
        return response.json();
      }
    })
    .then(data => {
      console.log(data);

      callback(null, data);
    })
    .catch(err => console.log(err));
};

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

export const UpdateDepartmentFetcher = ({ DepartmentId,Department,Remark,Active }, callback) => {
  console.log(DepartmentId,Department,Remark,Active);
  
  fetch(API.UpdateDepartment, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ departmentId:DepartmentId,department:Department,remark:Remark,active:Active}),
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

export const DesignationFetcher = callback => {
  fetch(API.DesignationFetcher, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache"
  })
    .then(response => {
      if (response.status === 200) {
        // console.log(response);
        return response.json();
      }
    })
    .then(data => {
      console.log(data);

      callback(null, data);
    })
    .catch(err => console.log(err));
};

export const InsertDesignationFetcher = ({ DesignationId,Designation,Remark,Active,CreatedDate }, callback) => {
  console.log("DATA is ===>",Remark,Active,Designation,CreatedDate);
  
  fetch(API.InsertDesignation, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ designationId:DesignationId,designation:Designation,remark:Remark,active:Active,createdDate:CreatedDate }),
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
