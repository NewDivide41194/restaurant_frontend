import * as API from "./url";
export const NavInfoFetcher = callback => {
    fetch(API.NAV, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY…3NTZ9.h5d4UDjmfdtzPUewLYxQNN1PaUfONEk-bZDcCxrLvyg"
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