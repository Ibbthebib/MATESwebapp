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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorMEssage: "",
    };
  }
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.header}>
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
              <Input
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
              <Input
                type="password"
                onChange={(e) => this.logInDetails("password", e)}
              ></Input>
            </FormControl>
            {this.state.errorMEssage !== "" ? (
              <Typography
                component="h1"
                variant="h6"
                className={classes.errorText}
              >
                Incorrect login info!
              </Typography>
            ) : (
              ""
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.logIn}
            >
              {" "}
              Log in
            </Button>
            <Typography>
              Dont have an account? <Link to="./Signup">Signup</Link>
            </Typography>
          </form>
        </Paper>
      </main>
    );
  }
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

  logIn = async (e) => {
    e.preventDefault();

    console.log(this.state);
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.history.push("/dashboard");
        },
        (error) => {
          this.setState({
            errorMEssage: "Please sign up",
          });
        }
      );
  };
}

export default withStyles(styles)(Login);
