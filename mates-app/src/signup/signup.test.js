import Signup from "./signup";
import React from "react";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import Enzyme from "enzyme";

import { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  FormControl,
  InputLabel,
  Input,
  Paper,
  withStyles,
  CssBaseline,
  Typography,
  Button,
} from "@material-ui/core";
import "regenerator-runtime/runtime";

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
Enzyme.configure({ adapter: new Adapter() });
// const Wrappers = mount(<Signup />);
afterEach(cleanup);

describe("DOM elements", () => {
  const Wrapper = shallow(<Signup />).dive();

  it("debugging", () => {
    expect(Wrapper);
  });
  it("Header", () => {
    const text = Wrapper.find(`[data-test='banner']`);
    expect(text.length).toBe(1);
  });
  it("Form", () => {
    const form = Wrapper.find(`form`);
    expect(form.length).toBe(1);
  });
  it("Input fields", () => {
    const input = Wrapper.find(`[data-test='input']`);
    expect(input.length).toBe(3);
  });
  it("Buttons", () => {
    const button = Wrapper.find(`[data-test='button']`);
    expect(button.length).toBe(2);
  });
});

describe("testing user interaction", () => {
  const Wrapper = shallow(<Signup />).dive();
  const input = Wrapper;

  it("passwords not matching", () => {
    input.setState({
      email: "hondurus@hotmail.com",
      password: "hello246",
      passwordConfirmation: "garry235",
    });
    expect(input.state().signingUpError).toEqual("");
    input.instance().submitForm({
      preventDefault: () => {},
    });
    expect(input.state().signingUpError).toEqual("Passwords do not match");
  });
});
