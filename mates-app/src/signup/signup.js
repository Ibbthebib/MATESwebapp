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

const firebase = require("firebase");
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
          <Typography component="h1" variant="h5" className={classes.header}>
            No Sweat Here!{" "}
          </Typography>
          <form onSubmit={(e) => this.submitForm(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email">Enter your email.</InputLabel>
              <Input
                autoComplete="email"
                autoFocus
                // id="signup-email"
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
                Password confirmation.
              </InputLabel>
              <Input
                type="password"
                onChange={(e) => this.userInput("passwordConfirmation", e)}
              ></Input>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Submit
            </Button>
            {
              <Typography className={classes.errorText}>
                {this.state.signingUpError}
              </Typography>
            }
            <Typography component="h5" className={classes.hasAccountHeader}>
              Already have an account?{" "}
              <Link className={classes.logInLink} to="./login">
                Log in
              </Link>
            </Typography>{" "}
          </form>
        </Paper>
      </main>
    );
  }

  validPass() {
    return this.state.password === this.state.passwordConfirmation
      ? true
      : false;
  }
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
  submitForm = (e) => {
    e.preventDefault();

    this.validPass() === false
      ? this.setState({
          signingUpError: "Passwords do not match",
        })
      : "";

    console.log("Submitting", this.state);
    console.log(this.validPass());

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
            signingUpError: "Unable to register user",
          });
        },
        (authError) => {
          console.log(authError);
          this.setState({
            signingUpError: "Unable to register user",
          });
        }
      );
  };
}

export default withStyles(styles)(Signup);
