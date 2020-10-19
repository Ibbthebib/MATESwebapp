import Settings from "./settings";
import React from "react";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import Enzyme from "enzyme";

import { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "regenerator-runtime/runtime";

Enzyme.configure({ adapter: new Adapter() });
// const Wrappers = mount(<Login />);
// afterEach(cleanup);

describe("DOM elements", () => {
  const Wrapper = shallow(<Settings />).dive();

  it("debugging", () => {
    expect(Wrapper);
  });
  it("Header", () => {
    const text = Wrapper.find(`[data-test='banner']`);
    expect(text.length).toBe(3);
  });
  it("Form", () => {
    const form = Wrapper.find(`form`);
    expect(form.length).toBe(1);
  });
  it("FormControl", () => {
    const formControl = Wrapper.find(`[data-test='FormControl']`);
    expect(formControl.length).toBe(1);
  });
  it("Input fields", () => {
    const input = Wrapper.find(`[data-test='Paper']`);
    expect(input.length).toBe(1);
  });
  it("Buttons", () => {
    const button = Wrapper.find(`[data-test='button']`);
    expect(button.length).toBe(3);
  });
  it("Modal", () => {
    const modal = Wrapper.find(`[data-test='Modal']`);
    expect(modal.length).toBe(1);
  });
});
