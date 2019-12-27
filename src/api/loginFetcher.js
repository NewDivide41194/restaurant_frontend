import * as API from "./url";
export const LoginFetcher = ({ userName, password }, callback) => {
    fetch(API.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
                "Accept": "*/*"
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