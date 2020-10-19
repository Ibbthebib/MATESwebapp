import Home from "./home";
import React from "react";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import Enzyme from "enzyme";

import { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "regenerator-runtime/runtime";

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe("DOM elements", () => {
  const Wrapper = shallow(<Home />);

  it("Modal", () => {
    const modals = Wrapper.find(`[data-test='Modal']`);
    expect(modals.length).toBe(2);
  });
  it("Paper", () => {
    const paper = Wrapper.find(`[data-test='Paper']`);
    expect(paper.length).toBe(1);
  });

  it("carousel", () => {
    const carousel = Wrapper.find(`[data-test='Carousel']`);
    expect(carousel.length).toBe(1);
  });

  it("buttons", () => {
    const button = Wrapper.find(`[data-test='Button']`);
    expect(button.length).toBe(2);
  });
  it("Banner", () => {
    const banner = Wrapper.find(`[data-test='Banner']`);
    expect(banner.length).toBe(1);
  });
  it("Header", () => {
    const header = Wrapper.find(`[data-test='Header']`);
    expect(header.length).toBe(1);
  });
});
