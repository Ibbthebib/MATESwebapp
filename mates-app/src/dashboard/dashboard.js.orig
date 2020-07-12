import React, { Component } from "react";

import {
  FormControl,
  InputLabel,
  Input,
  Paper,
  withStyles,
  CssBaseline,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import Send from "@material-ui/icons/Send";

import Chat from "../chat/chat";
import styles from "./styles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { withRouter } from "react-router";
import { BrowserRouter } from "react-router";
import ListComponent from "../chat/chatList";
import chat from "../chat/chat";

const firebase = require("firebase");

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      chats: [],
      text: "",
      currentChat: 0,
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <ListComponent
          history={this.props.history}
          currUser={this.state.email}
          selectChat={this.selectChat}
          chats={this.state.chats}
        ></ListComponent>

        <Paper className={classes.paper}>
          <FormControl>
            <Chat
              user={this.state.email}
              chat={this.state.chats[this.state.currentChat]}
            />{" "}
            <br />
            <br />
            <div>
              {/* //Get this to send */}
              <TextField
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
  }
  userTyping = (e) => {
    e.keyCode === 13
      ? e.preventDefault() + "" + this.sendingMessage()
      : this.setState({
          text: e.target.value,
        });
  };
  sendingMessage() {
    document.getElementById("textbox").value = "";

    const docKey = [this.state.email, this.state.chats[this.state.currentChat].users.filter(
      (users) => users !== this.state.email
    )[0]].sort().join(":");

  
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

  selectChat = (index) => {
    this.setState({ currentChat: index });
  };
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
          });
      }
    });
  };
}

export default withStyles(styles)(Dashboard);
