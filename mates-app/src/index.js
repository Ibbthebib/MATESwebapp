import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./login/login";
import Signup from "./signup/signup";
import Dashboard from "./dashboard/dashboard";
import Myprofile from "./myprofile/myprofile";
import Match from "./match/users";
import Home from "./home/home"

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyAdp8FzH_YK8qCbI1KtetPIOpLuEklsQAE",
  authDomain: "mates-c1a5c.firebaseapp.com",
  databaseURL: "https://mates-c1a5c.firebaseio.com",
  projectId: "mates-c1a5c",
  storageBucket: "mates-c1a5c.appspot.com",
  messagingSenderId: "426461801912",
  appId: "1:426461801912:web:d1aea64a052f8c32e6b34d",
  measurementId: "G-0F89G81XD8",
});

// Routing the consumer to the requested page (js file).
const routing = (
  <Router>
    {" "}
    <div id="routing-container">
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/myprofile" component={Myprofile}></Route>
      <Route path="/match" component={Match}></Route>
      <Route path="/home" component={Home}></Route>

    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
