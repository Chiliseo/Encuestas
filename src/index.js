import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-globally";
import { Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import "./index.css";
import _axios from "axios";
import App from "./App";
import Firebase, { FirebaseContext } from './components/Firebase';
import * as serviceWorker from "./serviceWorker";

const initialState = {
  login: sessionStorage.getItem("login") || false
};
function updateIndicator() {
  if (navigator.onLine) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    const baseURL = process.env.REACT_APP_API_REMOTE;
    const axios = _axios.create({
      baseURL,
      timeout: 1000000000
    });
    let data = JSON.parse(localStorage.getItem("answers"));
    if (data) {
      data.forEach(item => {
        axios.post("saveAnswers", item, config).then(res => {
          console.log(res);
        });
      });
    }
    localStorage.clear();
  }
  // Show a different icon based on offline/online
}

// Update the online status icon based on connectivity
window.addEventListener("online", updateIndicator);
window.addEventListener("offline", updateIndicator);
const history = createBrowserHistory();
// 

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router basename="/encuestas" history={history}>
      {/* <Router > */}
      <Provider globalState={initialState}>
        <App />
      </Provider>
      {/* </Router> */}
    </Router>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
