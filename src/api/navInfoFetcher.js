import * as API from "./url";
export const NavInfoFetcher = callback => {
    fetch(API.NAV, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNTc2NzQxNzc5LCJleHAiOjE1NzY4MjgxNzl9.PvMozVb8BfdW7SRe-Z5L_GcB3SSEhMZ9l0Gam920U50"
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