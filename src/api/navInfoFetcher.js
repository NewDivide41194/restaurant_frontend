import * as API from "./url";
export const NavInfoFetcher = callback => {
    fetch(API.NAV, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNTc3MDY5ODg3LCJleHAiOjE1NzcxNTYyODd9.tT9snibJYDgU60bktlBBqpk3L3wvAwl95PdfIoozMAs"
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