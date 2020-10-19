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
// import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ReactDOM from "react-dom";
import Login from "../login/login";
import SignUp from "../signup/signup";
import List from "@material-ui/core/List";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import ListItem from "@material-ui/core/ListItem";

/**
 * A functional based component which is created to present the home page of the browser
 * implementation to the user. The component is also intended to provide the user with the
 * ability to login and signup. Thereafter, a user is redirected to the dashboard.
 *
 * @author Ibrahim Alzilitni
 */
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const tutorialSteps = [
  {
    img:
      "https://images.unsplash.com/photo-1581499242002-4d081930dd25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    img:
      "https://images.unsplash.com/photo-1587726480710-003743795e40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1451&q=80",
  },
  {
    img:
      "https://images.unsplash.com/photo-1526893381913-e311045b8064?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
  },
  {
    img:
      "https://images.unsplash.com/photo-1586711247059-63dfa293152b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
  },
];
//CSS inline styling to be used for various elements that will be rendered to DOM.
const useStyles = makeStyles((theme) => ({
  modal: {
    overflowY: "hidden",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    overflowY: "hidden",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  content: {
    overflowY: "hidden",
    overflowX: "hidden",
    display: "flex",
    height: "auto",
    width: "100%",
    position: "relative",
    backgroundSize: "100%",
  },

  header: {
    fontSize: 40,
    fontWeight: 900,
    color: "White",
    fontFamily: "'Montserrat', sans-serif",
    flexBasis: "10%",
    flexShrink: 0,
    position: "absolute",
    top: 0,
    zIndex: 1000,
  },
  loginbutton: {
    position: "absolute",
    top: "8px",
    right: "16px",
    zIndex: 1000,
    border: "60px",
  },
  signupbutton: {
    position: "absolute",
    top: " 55%",
    left: "50%",
    zIndex: 1000,
  },
  banner: {
    color: "white",
    position: "absolute",
    top: "40%",
    left: "40%",
    zIndex: 1000,
  },
}));
/**
 * The main funciton that is being exported to the user of the application.
 * This function is the intended function to be rendered into the browser DOM.
 * The function handles the display of the background as well as the display of
 * the log in and sign up components. Thereafter these components are presented in a modal.
 * The modal has been inspired by material-ui with extensive changes to fit the systems needs.
 * https://material-ui.com/components/modal/
 * @param {*} props passing the properties of the application to the function since functional components do not
 * inheirt the props naturally.
 */
function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [signupopen, setSignupOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleSignupOpen = () => {
    setSignupOpen(true);
  };
  const handleSignupclose = () => {
    setSignupOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main id="root">
      <CssBaseline></CssBaseline>
      <Paper data-test="Paper" className={classes.content}>
        <Typography data-test="Header" variant="h2" className={classes.header}>
          Mates
        </Typography>
        <Typography data-test="Banner" variant="h3" className={classes.banner}>
          Match. Chat. Chill.
        </Typography>
        <Button
          data-test="Button"
          onClick={handleOpen}
          variant="contained"
          className={classes.loginbutton}
        >
          Log in
        </Button>

        <Button
          data-test="Button"
          onClick={handleSignupOpen}
          variant="contained"
          className={classes.signupbutton}
        >
          Sign up
        </Button>
        <SwipeableTextMobileStepper data-test="Carousel"></SwipeableTextMobileStepper>
        <Modal
          data-test="Modal"
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Login history={props.history}></Login>
          </Fade>
        </Modal>
        <Modal
          data-test="Modal"
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={signupopen}
          onClose={handleSignupclose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={signupopen}>
            <SignUp history={props.history}></SignUp>
          </Fade>
        </Modal>
      </Paper>
    </main>
  );
}
/**
 * This function deals with implementing the carousel feature where the background
 * changes to a different city photo.
 * The implementation itself has been inherited from the material-ui but
 * tailored and edited extensively to suit the needs of this application.
 * https://material-ui.com/components/steppers/
 */
function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) =>
          // <div>
          Math.abs(activeStep - index) <= 2 ? (
            <img
              style={{
                backgroundImage: "url(" + step.img + ")",
                backgroundPosition: "center",
                backgroundSize: "contain",
                overflowY: "hidden",
                overflowX: "hidden",
                display: "flex",
                top: 0,
                left: 0,
                height: 1000,
                width: 1000000,
                zIndex: -1,
                position: "relative",
              }}
            />
          ) : null
        )}
      </AutoPlaySwipeableViews>
    </div>
  );
}
export default TransitionsModal;
