import * as API from "./url";
export const NavInfoFetcher = callback => {
    fetch(API.NAV, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNTc2ODM3NjU1LCJleHAiOjE1NzY5MjQwNTV9.fbZ-sQCKRh1hFnAiQgnZlyfe8nyEUNoaMvX8vaUkFJ0"
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