import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

class Chat extends React.Component {
  componentDidUpdate() {
    // if ("scrollRestoration" in window.history) {
    //   window.history.scrollRestoration = "manual";
    // }
    const container = document.getElementById("chat");
    if (container) container.scrollTo(0, container.scrollHeight);
  }
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
          <main id="chat" className={classes.content}>
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
