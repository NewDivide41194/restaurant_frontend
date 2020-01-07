import * as API from "./url";
export const NavInfoFetcher = (token,callback) => {
    fetch(API.NAV, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
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
        console.log(data);
  
        callback(null, data) })
      .catch(err => console.log(err));
  };