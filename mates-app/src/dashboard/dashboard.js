import React, { Component } from "react";

import {
  FormControl,
  Paper,
  withStyles,
  CssBaseline,
  TextField,
} from "@material-ui/core";
import Settings from "../settings/settings";
import Chat from "../chat/chat";
import styles from "./styles";
import ListComponent from "../chat/chatList";
import { Avatar } from "@material-ui/core";
import Profile from "../myprofile/myprofile";
import Users from "../match/users";
import Productivty from "../productivity/productivty";
/**
 * The dashboard component is a class-based component and can be seen as the main page of the application.
 * This is because the user is able to access each component created within the application
 * from this component (dashboard). In turn, this emulates a single page application
 * experience.
 * @author Ibrahim Alzilitni
 */
const firebase = require("firebase");

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      chats: [],
      text: "",
      currentChat: 0,
      avatar: "",
      number: 0,
    };
  }
  /**
   * The render function dictates what is presented to the user.
   * If the number variable (controlled by the recieivingInfo function) contained within the state is 0 then the chat
   * component will be executed showing a users chat history with another user.
   * If the number variable located in the state above changes and becomes 1 then this
   * indicates that the user will want to browse through other user profiles.
   * If the number variable is changed to 2 then this will result in the productivity
   * page being executed. Number 3 will lead to presenting a user with their profile.
   * Number 4 indicates that the user will want to access the settings page.
   */
  render() {
    const { classes } = this.props;
    if (this.state.number === 0) {
      return (
        <main className={classes.main}>
          <CssBaseline></CssBaseline>
          <ListComponent
            data-test="listComponent"
            history={this.props.history}
            currUser={this.state.email}
            selectChat={this.selectChat}
            chats={this.state.chats}
            avatar={this.state.avatar}
            recievingInfo={this.recievingInfo}
          ></ListComponent>

          <Paper data-test="Paper" className={classes.paper}>
            <FormControl data-test="formControl">
              <Avatar data-test="avatar">
                <img className={classes.avatar} src={this.state.avatar}></img>
              </Avatar>
              <Chat
                data-test="chat"
                user={this.state.email}
                chat={this.state.chats[this.state.currentChat]}
              />{" "}
              <br />
              <br />
              <div>
                <TextField
                  data-test="textField"
                  placeholder="Type your message.."
                  onKeyUp={(e) => {
                    this.userTyping(e);
                  }}
                  id="textbox"
                  className={classes.chatTextBox}
                  onFocus={this.userClickedInput}
                ></TextField>
              </div>
            </FormControl>
          </Paper>
        </main>
      );
    } else if (this.state.number === 1) {
      console.log("its 1");
      return (
        <main className={classes.main}>
          <CssBaseline></CssBaseline>
          <ListComponent
            history={this.props.history}
            currUser={this.state.email}
            selectChat={this.selectChat}
            chats={this.state.chats}
            avatar={this.state.avatar}
            recievingInfo={this.recievingInfo}
          ></ListComponent>

          <Paper className={classes.paper}>
            <Users></Users>
          </Paper>
        </main>
      );
    } else if (this.state.number === 2) {
      return (
        <main className={classes.main}>
          <CssBaseline></CssBaseline>
          <ListComponent
            history={this.props.history}
            currUser={this.state.email}
            selectChat={this.selectChat}
            chats={this.state.chats}
            avatar={this.state.avatar}
            recievingInfo={this.recievingInfo}
          ></ListComponent>

          <Paper className={classes.paper}>
            <Productivty user={this.state.email}></Productivty>
          </Paper>
        </main>
      );
    } else if (this.state.number === 3) {
      return (
        <main className={classes.main}>
          <CssBaseline></CssBaseline>
          <ListComponent
            history={this.props.history}
            currUser={this.state.email}
            selectChat={this.selectChat}
            chats={this.state.chats}
            avatar={this.state.avatar}
            recievingInfo={this.recievingInfo}
          ></ListComponent>

          <Paper className={classes.paper}>
            <Profile></Profile>
          </Paper>
        </main>
      );
    } else if (this.state.number === 4) {
      return (
        <main className={classes.main}>
          <CssBaseline></CssBaseline>
          <ListComponent
            history={this.props.history}
            currUser={this.state.email}
            selectChat={this.selectChat}
            chats={this.state.chats}
            avatar={this.state.avatar}
            recievingInfo={this.recievingInfo}
          ></ListComponent>
          <Paper className={classes.paper}>
            <Settings></Settings>
          </Paper>
        </main>
      );
    }
  }
  /**
   * The userTyping function is employed to figure out when a user
   * would like to send a message. This is done by listening for the keycode 13
   * to be pressed or in other words the "enter" on the keyboard. If this key code is recieived
   * then the sendingMessage function is called.
   * If not then the state properties are altered with the text written by a user.
   */
  userTyping = (e) => {
    e.keyCode === 13
      ? e.preventDefault() + "" + this.sendingMessage()
      : this.setState({
          text: e.target.value,
        });
  };
  /**
   * The sending message function has two jobs. The first being the job of clearing
   * the user input field when a message is sent. The second is to send a message
   * to a specific chat. This is done by accessing the database and updating the required chat
   * with the new input sent by the user. The docKey in the method is designed to update the
   * database with a unique identifier by joining two emails: the current user and the connection.
   * Thereafter a chat can be accessed via the docKey and updating a chat becomes possible.
   */
  sendingMessage() {
    document.getElementById("textbox").value = "";

    const docKey = [
      this.state.email,
      this.state.chats[this.state.currentChat].users.filter(
        (users) => users !== this.state.email
      )[0],
    ]
      .sort()
      .join(":");

    firebase
      .firestore()
      .collection("chatsDB")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message: this.state.text,
        }),
      });
  }
  /**
   * The recieivingInfo method is the crux of providing a single page application experience.
   * This is because this method alters the number class property found in the state.
   * This is done when a user requestings a page from within the ChatList component. The
   * ChatList component then alters this method with desired number representing page.
   * Thereafter, the render method updates and executes the desired page.
   * @param {*} index the number received to alter the state with.
   */
  recievingInfo = (index) => {
    this.setState({ number: index });
  };
  /**
   * Similary to the recieivingInfo method, the selectChat method is used
   * by the ChatListComponent to fetch a chat in the database by using a key
   * to find the chat. This key is passed into the dashboard component and
   * this method then changes the components currentChat properties to match the
   * key for the chat that is to be presented.
   * The method also loads an avatar for the connection of the user from the database.
   * @param {*} index the key for the chat to be presented.
   */
  selectChat = (index) => {
    this.setState({ currentChat: index });
    firebase
      .storage()
      .ref(
        this.state.chats[index].users.filter(
          (users) => users !== this.state.email
        )[0]
      )
      .child("mainphoto")
      .getDownloadURL()
      .then((url) => {
        this.setState({ avatar: url });
        console.log(url);
      });
  };
  /**
   * The componentDidUpdate method is a lifecycle method and is inherited from the React.Component class.
   * This method is used to figure out if any updates have occured and what
   * actions to take once an update has occured.
   * @param {*} prevProps the previous properties of this class.
   * @param {*} prevState the previous state properties of this class.
   */
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.number !== this.state.number) {
      this.forceUpdate();
    }
  };
  /**
   * The componentDidMount function is also a lifecycle method.
   * The component is activated as soon as this class is presented to the user.
   * At first a security check is made and if passed the users details are loaded
   * such as current chats.
   */
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        this.props.history.push("/login");
      } else {
        await firebase
          .firestore()
          .collection("chatsDB")
          .where("users", "array-contains", user.email)
          .onSnapshot(async (result) => {
            const firebaseChats = result.docs.map((doc) => doc.data());
            await this.setState({
              email: user.email,
              chats: firebaseChats,
            });
            console.log(firebaseChats);
          });
      }
    });
  };
}

export default withStyles(styles)(Dashboard);
