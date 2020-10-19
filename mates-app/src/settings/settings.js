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
import styles from "./styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

/**
 * Changingpassword a class based component which is used to allow a user the ability to change their
 * password. This is done by presenting three input fields. The users current email, password
 * and new password. Thereafter these details are updated in the database.
 * @author Ibrahim Alzilitni
 */
const firebase = require("firebase");

class ChangingPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      newPassword: "",
      changingPassError: "",
      validForm: true,
      updated: "",
    };
  }
  render() {
    return (
      <main className={styles.main}>
        <CssBaseline></CssBaseline>
        <Paper className={styles.paper}>
          <Typography component="h1" variant="h5" className={styles.header}>
            Changing Password{" "}
          </Typography>
          <form onSubmit={(e) => this.submitForm(e)} className={styles.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email">Enter your email.</InputLabel>
              <Input
                autoComplete="email"
                autoFocus
                onChange={(e) => this.userInput("email", e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password">
                Enter your password.
              </InputLabel>
              <Input
                type="password"
                id="signup-password"
                onChange={(e) => this.userInput("password", e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confimration">
                Enter your new password.
              </InputLabel>
              <Input
                type="password"
                onChange={(e) => this.userInput("newPassword", e)}
              ></Input>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.submit}
            >
              Submit
            </Button>
            {
              <Typography className={styles.errorText}>
                {this.state.changingPassError}
              </Typography>
            }
            {
              <Typography className={styles.updated}>
                {this.state.updated}
              </Typography>
            }
          </form>
        </Paper>
      </main>
    );
  }
  /**
   * The valid pass method is used to check whether both the password
   * and the passwordConfirmation field match. This is to make sure the user has not
   * made an error when confirming their password.
   */
  validPass() {
    return this.state.password !== this.state.passwordConfirmation
      ? true
      : false;
  }
  /**
   * The userInput method is used when a user decides to change their accounts password.
   * The method is called while the user types in their email, password or new password.
   * if the type passed in to the method is of email then the method will update
   * the email in state properties.
   * Password type - the method will update the password in state properties.
   * New password type - the method will update the newPassword in state properties.
   * @param {*} type the type can be email, password or new password.
   * @param {*} e the users input.
   */
  userInput(type, e) {
    switch (type) {
      case "email":
        this.setState({
          email: e.target.value,
        });
        break;
      case "password":
        this.setState({
          password: e.target.value,
        });
        break;
      case "newPassword":
        this.setState({
          newPassword: e.target.value,
        });
        break;
      default:
        break;
    }
  }
  /**
   * The method reauthentiactes the user so that the server does not ask the user
   * to relog in and cause hassle. With this method the user can change password
   * without running into server errors.
   * @param {*} currentPassword is the users password.
   */
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };
  /**
   * The changePassword method when called takes in the users password and the new password.
   * The current password is used for reauthentication while the new password is updated in the database.
   * @param {*} currentPassword is the users current password.
   * @param {*} newPassword is the users new password.
   */
  changePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            this.setState({ updated: "Succesful!" });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**
   * The submitForm is used to submit the users new details by calling the changePassword
   * method.
   * @param {*} e an event which is used just below to prevent subsequent page reloading.
   */
  submitForm = (e) => {
    e.preventDefault();

    this.validPass() === false
      ? this.setState({
          changingPassError: "Passwords do not match",
        })
      : "";
    this.changePassword(this.state.password, this.state.newPassword);
  };
}
/**
 * TransitionsModal is a functional based react component which deals with the functions available
 * to the user such as deleting, signing out and changing a password of an account.
 * The function is rendered and also makes use of the changing password class component
 * found above.
 * @param {*} props as arguments since functional components do not inherit props naturally.
 */
function TransitionsModal(props) {
  const classes = useStyles();
  let history = useHistory();
  //Functional component state
  const [open, setOpen] = React.useState(false);
  let [deleteError, setDeleteError] = React.useState("");
  //opens the modal for changing password component.
  const changePasswordOpen = () => {
    setOpen(true);
  };
  //closes the modal for changing password component.
  const changepasswordClose = () => {
    setOpen(false);
  };
  //Deletes a users account.
  const deleteUser = () => {
    firebase
      .auth()
      .currentUser.delete()
      .catch(
        setDeleteError(
          " Requires recent authentication please re-log in and try again."
        )
      );
  };
  //Signs the user out.
  const handleSignOut = () => {
    // this.props.history.push("./home");

    firebase
      .auth()
      .signOut()
      .then(function () {
        this.props.history.push("./home");
      })
      .catch(function (error) {
        // An error happened.
        setDeleteError(error.message);
      });
    this.props.history.push("./home");
  };

  return (
    <main className={styles.main}>
      <CssBaseline></CssBaseline>
      <Paper data-test='Paper'className={classes.paper}>
        <form className={styles.form} noValidate autoComplete="off">
          <FormControl data-test='FormControl'>
            <Typography data-test='banner' variant="h5" className={styles.header}>
              Sign out?
            </Typography>
            <Button data-test='button' onClick={handleSignOut}>Click here!</Button>
            <Typography data-test='banner'variant="h5" className={classes.header}>
              Change password
            </Typography>

            <Button data-test='button' onClick={changePasswordOpen}>Click here!</Button>
            <br />
            <Typography data-test='banner' variant="h5" className={styles.header}>
              Delete account
            </Typography>

            <Button data-test='button' onClick={deleteUser}>Click here!</Button>
            <br />

            <Typography className={styles.errorText}>{deleteError}</Typography>
          </FormControl>
        </form>

        <Modal data-test='Modal'
          className={classes.modal}
          open={open}
          onClose={changepasswordClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <ChangingPassword history={props.history}></ChangingPassword>
          </Fade>
        </Modal>
      </Paper>
    </main>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: "center",
    background: "white",
    overflow: "auto",
    overflowY: "scroll",
    position: "relative",
    borderRadius: "20px",
    padding: `${theme.spacing(8)}px ${theme.spacing(9)}px ${
      theme.spacing(3)
    }px`,
    height: 650,
  },
  modal: {
    overflowY: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default withStyles(styles)(TransitionsModal);
