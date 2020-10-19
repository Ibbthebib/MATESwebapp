import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
/**
 * The Chat class based component is used to present the user with a chat history
 * between themselves and a connection. Thereafter the chat history is presented
 * in a UI friendly method.
 * @author Ibrahim Alzilitni
 */
const firebase = require("firebase");

class Chat extends React.Component {
  constructor(props) {
    super();
    this.state = {
      props: props,
      avatar: "",
    };
  }
  /**
   * The componentDidUpdate lifecycle method makes sure that the chat is always
   * directed towards the last message.This way the user does not have to scroll
   * all the way to the bottom of the chat history to see the latest message.
   */
  componentDidUpdate() {
    const chat = document.getElementById("chathistory");
    if (chat) chat.scrollTo(0, chat.scrollHeight);
  }
  /**
   *  The render method is used to display the properties that have been created to present
   * the chat histroy in a user friendly way.
   */
  render() {
    const { classes, chat, user } = this.props;
    if (chat === undefined) {
      return <main className={classes.content}></main>;
    } else if (chat !== undefined) {
      return (
        <div>
          <div className={classes.chatHeader}>
            {chat.users.filter((users) => users !== user)[0]}
          </div>
          <main data-test="chat" id="chathistory" className={classes.content}>
            {chat.messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={
                    message.sender === user
                      ? classes.userSent
                      : classes.friendSent
                  }
                >
                  {message.sender !== user
                    ? "Sent by " + message.sender + " : " + message.message
                    : "Me: " + message.message}
                </div>
              );
            })}
          </main>
        </div>
      );
    }
  }
}

export default withStyles(styles)(Chat);
