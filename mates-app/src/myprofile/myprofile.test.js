import Profile from "./myprofile";
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

const history = createMemoryHistory();
history.push('/');
describe("DOM elements", () => {
  const Wrapper = shallow(<Profile history={history}/>).dive();

  it("debugging", () => {
    expect(Wrapper);
  });
  it("Header", () => {
    const text = Wrapper.find(`[data-test='banner']`);
    expect(text.length).toBe(2);
  });
  it("Form", () => {
    const form = Wrapper.find(`form`);
    expect(form.length).toBe(1);
  });
  it("FormControl", () => {
    const formControl = Wrapper.find(`[data-test='FormControl']`);
    expect(formControl.length).toBe(1);
  });
  it("Image", () => {
    const image = Wrapper.find(`img`);
    expect(image.length).toBe(1);
  });
  it("ImageInput", () => {
    const imageInput = Wrapper.find(`input`);
    expect(imageInput.length).toBe(1);
  });
  it("Paper", () => {
    const paper = Wrapper.find(`[data-test='Paper']`);
    expect(paper.length).toBe(1);
  });
  it("Input fields", () => {
    const input = Wrapper.find(`[data-test='fields']`);
    expect(input.length).toBe(3);
  });
  it("Buttons", () => {
    const button = Wrapper.find(`[data-test='button']`);
    expect(button.length).toBe(3);
  });
 
});