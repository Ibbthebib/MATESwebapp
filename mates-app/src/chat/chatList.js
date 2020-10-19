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
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
/**
 The ChatListComponent is used to display the users existing connections while allowing the display of the 
 chat history with a specific connection. The component also allows for a user to scroll between different components such as 
 browsing, chat, productivty, profile and settings.
 @author Ibrahim Alzilitni
 */
const firebase = require("firebase");

class ChatListComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      userpic: "",
      otherUser: "",
      name: "",
    };
  }
  /**
   * The render method here is used in two ways: if a user has connections then the method will
   * present the user with their existing connections alongside the ability to access the aforementioned
   * compoennts. If the user does not have any connections then this is indicated to the user,
   * alongside the above mentioned components.
   */
  render() {
    const { classes } = this.props;
    if (this.props.chats.length > 0) {
      return (
        <div className={classes.root}>
          <Button
            onClick={() => this.recievingInfo(4)}
            variant="outlined"
            fullWidth
          >
            Mates
          </Button>
          <IconButton
            component="span"
            className={classes.personIcon}
            onClick={() => this.recievingInfo(3)}
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
          <ScrollableTabsButtonAuto
            recievingInfo={this.recievingInfo}
          ></ScrollableTabsButtonAuto>
          <List className={classes.listRoot}>
            {this.props.chats.map((chat, index) => {
              return (
                <div key={index}>
                  <ListItem
                    onClick={() => this.passingChatIndex(index)}
                    alignItems="flex-start"
                  >
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
          <Button
            data-test="Button"
            onClick={() => this.recievingInfo(4)}
            variant="outlined"
            fullWidth
          >
            No Mates yet!
          </Button>
          <IconButton
            data-test="icon"
            component="span"
            className={classes.mainphoto}
            onClick={() => this.recievingInfo(3)}
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
          <ScrollableTabsButtonAuto
            data-test="scrollableMenu"
            recievingInfo={this.recievingInfo}
          ></ScrollableTabsButtonAuto>
          <List data-test="chatList"></List>
        </div>
      );
    }
  }
  /**
   * The passingChatIndex method takes in an index key from the render method by filtering through
   * the chat list. The key is then passed to the parent component upon user tapping a specific
   * chat. Thereafter, this key used in the aprent component to present the chat with a connection
   * to the user.
   * @param {*} index the key for a chat.
   */
  passingChatIndex = (index) => {
    this.props.selectChat(index);
  };
  /**
   * The recieivingInfo is passed a number from the functional component scroallable tabs button found below.
   * Thereafter, this number is passed to the parent component and will be set into the state properties
   * of the parent component. The purpose of the number is to respresent the different pages for the user to access
   * such as chat, browsing and productivity.
   * @param {*} index the number representing the above components.
   */
  recievingInfo = (index) => {
    this.props.recievingInfo(index);
  };
}
//CSS styling.
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    opacity: 0.5,
  },
}));
/**
 * The ScrollableTabsButtonAutto function is a function which allows multiple buttons to exist in
 * a scrollable fashion. This method is more modern than having multiple buttons all over a page.
 * The function itself is adopted from material-ui however been extensively edited to fit
 * and serve the applications needs. Upon accesing a tab the function will set the value of the tab and
 * send this value to the recieivingInfo method above. Thereafter the parent component is able to
 * access different components depending on the number sent.
 * https://material-ui.com/components/tabs/
 * @param {*} props taking in the class properties.
 */
function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    recievingInfo(newValue);
  };
  //Accesses the recieivnigInfo method found above in the class.
  const recievingInfo = (index) => {
    console.log(index);
    props.recievingInfo(index);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Chat" />
          <Tab label="Match" />
          <Tab label="Productive" />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ChatListComponent);
