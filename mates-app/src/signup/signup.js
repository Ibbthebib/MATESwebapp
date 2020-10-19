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
/**
 * The Signup class component is developed to help a user create an account
 * that can be used with the application. The method offers the traditional way of creating an
 * account via email. The method also allows a user to log in via a third party such as Facebook.
 *
 * @author Ibrahim Alzilitni
 */

const firebase = require("firebase");
var provider = new firebase.auth.FacebookAuthProvider();

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      signingUpError: "",
      validForm: true,
    };
  }
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography
            data-test="banner"
            component="h1"
            variant="h5"
            className={classes.header}
          >
            No Sweat Here!{" "}
          </Typography>
          <form onSubmit={(e) => this.submitForm(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email">Enter your email.</InputLabel>
              <Input
                data-test="input"
                data-testid="emailinput"
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
                data-test="input"
                type="password"
                id="signup-password"
                onChange={(e) => this.userInput("password", e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confimration">
                Password confirmation.
              </InputLabel>
              <Input
                data-test="input"
                type="password"
                onChange={(e) => this.userInput("passwordConfirmation", e)}
              ></Input>
            </FormControl>
            <Button
              data-test="button"
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Submit
            </Button>
            <Button
              data-test="button"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={(e) => this.facebook(e)}
            >
              Facebook
            </Button>
            {
              <Typography className={classes.errorText}>
                {this.state.signingUpError}
              </Typography>
            }
            <Typography component="h5" className={classes.hasAccountHeader}>
              Already have an account?{" "}
              <Link to="./login">Login</Link>

            </Typography>{" "}
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
    return this.state.password === this.state.passwordConfirmation
      ? true
      : false;
  }
  /**
   * The userInput method is used when a user signs up for an
   * account the traditional way by email and password.
   * The method is called while the user types in their email, password or password confirmation.
   * if the type passed in to the method is of email then the method will update
   * the email in state properties.
   * Password type then the method will update the password in state properties.
   * Password confirmation type then the method will update the password confirmation in state properties.
   * @param {*} type the type can be email, password or password confirmation.
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
      case "passwordConfirmation":
        this.setState({
          passwordConfirmation: e.target.value,
        });
        break;
      default:
        break;
    }
  }
  /**
   * The facebook method is used to allow a user to sign up to their account via
   * a thirdparty organisation in this case Facebook.
   * @param {*} e an event which is used just below to prevent subsequent page reloading.
   */
  facebook = (e) => {
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
          signingUpError: error.message,
        });
      });
  };
  /**
   * The submitForm method is called when a user submits the form and in our case when a user
   * signs up for an account. The user will be redirected to the dashboard upon successful sign up.
   * If not, then the user will be presented with an error message.
   * @param {*} e an event which is used just below to prevent subsequent page reloading.
   */
  submitForm = (e) => {
    e.preventDefault();
    this.validPass() === false
      ? this.setState({
          signingUpError: "Passwords do not match",
        })
      :
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        (authRes) => {
          const user = {
            email: authRes.user.email,
          };
          firebase
            .firestore()
            .collection("userDB")
            .doc(this.state.email)
            .set(user)
            .then(() => {
              this.props.history.push("/dashboard");
            });
        },
        (dbError) => {
          console.log(dbError);
          this.setState({
            signingUpError: dbError.message,
          });
        },
        (authError) => {
          this.setState({
            signingUpError: authError.message,
          });
        }
      );
  };
}

export default withStyles(styles)(Signup);
