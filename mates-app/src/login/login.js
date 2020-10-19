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
} from "@material-ui/core";
import styles from "./styles";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'

/**
 * The login class component is designed to permit a user to the ability
 * to log in and access their account.
 * @author Ibrahim Alzilitni
 */
const firebase = require("firebase");
var provider = new firebase.auth.FacebookAuthProvider();

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorMEssage: "",
      facebook: false,
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography data-test="banner" component="h1" variant="h5" className={classes.header}>
            Welcome to Mates!
          </Typography>
          <form onSubmit={(e) => this.logIn(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel
                htmlFor="login-email-input"
                className={classes.InputLabel}
              >
                Enter your email
              </InputLabel>
              <Input data-test='input'
                type="email"
                onChange={(e) => this.logInDetails("email", e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel
                htmlFor="login-password-input"
                className={classes.InputLabel}
              >
                Enter your password
              </InputLabel>
              <Input data-test='input'
                type="password"
                onChange={(e) => this.logInDetails("password", e)}
              ></Input>
            </FormControl>

            <Typography
              component="h1"
              variant="h6"
              className={classes.errorText}
            >
              {this.state.errorMEssage}{" "}
            </Typography>

            <Button data-test='button'
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.logIn}
            >
              {" "}
              Log in
            </Button>
            <br />
            <br />
            <Button data-test='button'
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => this.facebook(e)}
            >
              {" "}
              Facebook{" "}
            </Button>
            <Typography className={classes.noaccount}>
              Dont have an account? <Link to="./login">Signup</Link>
            </Typography>
          </form>
        </Paper>
      </main>
    );
  }
  /**
   * The facebook method is used to allow a user to log in to their account via
   * a thirdparty organisation in this case Facebook.
   * @param {*} e an event which is used just below to prevent subsequent page reloading.
   */
  facebook = async (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        const userEmail = {
          email: user.email,
        };
        firebase
          .firestore()
          .collection("userDB")
          .doc(user.email)
          .set(userEmail)
          .then((response) => {
            this.props.history.push("/dashboard");
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        this.setState({
          errorMEssage: error.message,
        });
      });
  };
  /**
   * The login details method is used when a user logs into their
   * account the traditional way by email and password.
   * The method is called while the user types in their email or password.
   * if the type passed in to the method is of email then the method will update
   * the email in state properties.
   * Password type then the method will update the password in state properties.
   * @param {*} type the type can be email or password.
   * @param {*} e the users input.
   */
  logInDetails = (type, e) => {
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

      default:
        break;
    }
  };
  /**
   * The log in method is called when a user submits the form and in our case when a user
   * logs into their account. This message will check with the server if the account
   * exists. If so, then the user will be redirected to the dashboard.
   * If not, then the user will be presented with an error message.
   * @param {*} e an event which is used just below to prevent subsequent page reloading.
   */
  logIn =  (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.history.push("/dashboard");
        },
        (error) => {
          this.setState({
            errorMEssage: error.message,
          });
        }
      );
  };
}

export default withStyles(styles)(Login);
