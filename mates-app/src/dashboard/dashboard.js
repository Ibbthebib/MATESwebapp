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

const firebase = require("firebase");

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      chats: [],
      text: "",
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>

        <Paper className={classes.paper}>
          <FormControl>
            <IconButton
              component="span"
              className={classes.mainphoto}
              onClick={() => this.props.history.push("/myprofile")}

              // onClick={this.props.history.push("/myprofile")}
              // aria-label="profile"
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
            <Chat
              // id="chats"
              user={this.state.email}
              chat={this.state.chats[0]}
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
              {/* <button type="button">send </button> */}
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
    // let dockey = "";
    document.getElementById("textbox").value = "";

    const docKey = this.buildDocKey(
      this.state.chats[0].users.filter(
        (userss) => userss !== this.state.email
      )[0]
    );
    // console.log(docKey);
    // console.log(this.buildDocKey);
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
  buildDocKey = (friend) => [this.state.email, friend].sort().join(":");

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
            // console.log(this.state);
          });
      }
      // console.log(this.state);
    });
  };
}

export default withStyles(styles)(Dashboard);
