import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const firebase = require("firebase");
let urll = "";
let userr = "";

class ChatListComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      userpic: "",
      otherUser: "",
    };
  }

  render() {
    const { classes } = this.props;
    // console.log(this.props)
    let urlarray = [];
    if (this.props.chats.length > 0) {
      return (
        <div className={classes.root}>
          <Button variant="outlined" fullWidth>
            Mates
          </Button>
          <IconButton
            component="span"
            className={classes.mainphoto}
            onClick={() => this.props.history.push("/myprofile")}
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
          <List>
            {this.props.chats.map((chat, index) => {
              return (
                <div key={index}>
                  <ListItem
                    onClick={() => this.selectChat(index)}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <img
                          src={
                            this.state.otherUser
                            // "http://via.placeholder.com/400x300"
                          }
                        ></img>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        chat.users.filter(
                          (user) => user !== this.props.currUser
                        )[0]
                      }
                      secondary={
                        <Typography>
                          {chat.messages[
                            chat.messages.length - 1
                          ].message.substring(0, 15) + "..."}
                        </Typography>
                      }
                    />
                  </ListItem>
                </div>
              );
            })}
          </List>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
           <Button variant="outlined" fullWidth>
            No Mates yet!
          </Button>
          <IconButton
            component="span"
            className={classes.mainphoto}
            onClick={() => this.props.history.push("/myprofile")}
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
          <List></List>
        </div>
      );
    }
  }
  selectChat = (index) => {
    this.props.selectChat(index);
  };
}

export default withStyles(styles)(ChatListComponent);
