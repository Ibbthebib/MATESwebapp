import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./login/login";
import Signup from "./signup/signup";
import Dashboard from "./dashboard/dashboard";
import Myprofile from "./myprofile/myprofile";
import Match from "./match/users";
import Home from "./home/home"
import Productivity from "./productivity/productivty";
/**
 * This is the file that deals with initialising the application with the server
 * on the users end. This is due to each instance connecting to firebase server via the below
 * configuration. In addition, this file deals wkth routing the different pages and allocating
 * these pages to components. 
    @author Ibrahim Alzilitni
 */
const firebase = require("firebase");
require("firebase/firestore");
//Firebase configuration including api to connect to server.
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
var perf = firebase.performance();


// Routing the consumer to the requested page/Component (js file).
const routing = (
  <Router>
    {" "}
    <div id="routing-container">
      {/* <Route path="/loginn" component={Login}></Route> */}
      <Route path="/signup" component={Signup}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/myprofile" component={Myprofile}></Route>
      <Route path="/match" component={Match}></Route>
      <Route path="/login" component={Home}></Route>
      <Route path="/productive" component={Productivity}></Route>

    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
