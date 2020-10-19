import Chat from "./chat";
import ChatList from "./chatList";
import React from "react";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import Enzyme from "enzyme";

import { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "regenerator-runtime/runtime";
import { createMemoryHistory } from "history";

const firebase = require("firebase");
// require("firebase/firestore");

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
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe("DOM elements", () => {
  let chat = [];
  const Wrapper1 = shallow(<ChatList chats={chat} />).dive();

  it("divider", () => {
    const div = Wrapper1.find(`div`);
    expect(div.length).toBe(1);
  });
  it("menu", () => {
    const menu = Wrapper1.find(`[data-test='scrollableMenu']`);
    expect(menu.length).toBe(1);
  });

  it("chatlist", () => {
    const list = Wrapper1.find(`[data-test='chatList']`);
    expect(list.length).toBe(1);
  });

  it("buttons", () => {
    const button = Wrapper1.find(`[data-test='Button']`);
    expect(button.length).toBe(1);
  });
  it("icons", () => {
    const icon = Wrapper1.find(`[data-test='icon']`);
    expect(icon.length).toBe(1);
  });
});
