import Productivty from "./productivty";
import React from "react";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import Enzyme from "enzyme";

import { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "regenerator-runtime/runtime";
import { createMemoryHistory } from 'history';

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
afterEach(cleanup);


describe("DOM elements", () => {
  const Wrapper = shallow(<Productivty user={"ibby@hotmail.com"}/>).dive();

  it("debugging", () => {
    expect(Wrapper);
  });
  it("Header", () => {
    const text = Wrapper.find(`[data-test='banner']`);
    expect(text.length).toBe(1);
  });
  
  it("img", () => {
    const img = Wrapper.find(`img`);
    expect(img.length).toBe(1);
  });

  it("div", () => {
    const image = Wrapper.find(`main`);
    expect(image.length).toBe(1);
  });
  
  it("Paper", () => {
    const paper = Wrapper.find(`[data-test='Paper']`);
    expect(paper.length).toBe(1);
  });

});