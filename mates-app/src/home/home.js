import React, { Component } from "react";
import styles from "./styles";
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
import styling from "./styles.css";
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
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const tutorialSteps = [
  //London
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

const useStyles = makeStyles((theme) => ({
  modal: {
    overflowY: "hidden",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // position: "static",
  },
  paper: {
    overflowY: "hidden",
    // overflowX: 'hidden',


    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // position: "static",
  },
  content: {
    overflowY: "hidden",
    overflowX: 'hidden',


    // WebkitOverflowScrolling: "none",
    // overflow:"hidden",    // overflow:"none",
    // backgroundImage: `url(${require("../home/goodtime.jpg")})`,
    // backgroundPosition: "center",
    // backgroundSize: "contain",
    // backgroundRepeat: "repeat",

    // marginTop: theme.spacing.unit * 10,
    display: "flex",
    height: "auto",
    width: "auto",
    position: "relative",
    // position:"relative",    // flexDirection: "column",
    // alignItems: "center",
    // padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
    //   90
    // )}px`,
  },

  header: {
    // overflowY: "hidden",
    // marginLeft:200,
    fontSize: 40,
    fontWeight: 900,
    color: "White",
    fontFamily: "'Montserrat', sans-serif",
    flexBasis: "10%",
    flexShrink: 0,
    position: "absolute",
    top: 0,
    zIndex:1000
  },
  loginbutton: {
    // overflowY: 'hidden',

    // top: "auto",
    // bottom: 0,
    // color:"white"
    position: "absolute",
    top: "8px",
    right: "16px",
    zIndex:1000,
    // padding:"20px"
    border:"60px"
  },
  signupbutton: {
    // overflowY: 'hidden',

    
    // bottom: "6px",
    // color:"white"
    position: "absolute",
    // display: "flex",

    // // top: "8px",
    // alignItems: "center",
    // justifyContent: "center",   
    //  marginRight: "auto",
    //  marginLeft: "auto",
    top: " 55%",
    left: "50%",
    zIndex:1000,
  },
  banner:{
    color:"white",
position:"absolute",
top:"40%",
left:"40%",
zIndex:1000,

  },
  // root: {
  //   // maxWidth: 600,
  //   // flexGrow: 1,
  // },
  // header: {
  //   display: "flex",
  //   alignItems: "center",
  //   height: 50,
  //   paddingLeft: theme.spacing(4),
  //   backgroundColor: theme.palette.background.default,
  // },
  // nextarrow: {
  //   marginLeft: 270,
  //   height: 400,
  //   position: "absolute",
  // },
  // backarrow: {
  //   marginLeft: -70,
  //   height: 400,

  //   position: "absolute",
  // },
  img: {
    alignItems: "center",
    // position:"fixed",
    marginLeft: "auto",
    marginRight: "auto",
    height: 800,
    // display: 'block',
    width: "auto",
    overflow: "hidden",
    // width: "1000%",
  },
  stepper: {
    // alignItems: "center",
    // position: "static",
    // marginLeft: 105,
    // marginRight:"auto"
  },
}));

function TransitionsModal(props) {
  console.log("im here");
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
      <Paper className={classes.content}>
        <Typography variant="h2" className={classes.header}>Mates</Typography>
        <Typography variant="h3" className={classes.banner}>Match. Chat. Chill.</Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          className={classes.loginbutton}
        >
          Log in
        </Button>

        <Button
          onClick={handleSignupOpen}
          variant="contained"
          className={classes.signupbutton}
        >
          Sign up
        </Button>
        <SwipeableTextMobileStepper></SwipeableTextMobileStepper>

        {/* <List component="nav">
          <ListItem component="div">
            
          </ListItem>
        </List> */}

        <Modal
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
      {/* <Button
        className={classes.backarrow}
        size="small"
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
        {/* Back */}
      {/* </Button> */}
      {/* <Button
        className={classes.nextarrow}
        size="small"
        onClick={handleNext}
        disabled={activeStep === maxSteps - 1}
      >
        {/* Next */}
      {/* {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )} */}
      {/* </Button>   */}
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
              // className={classes.img}
              // src={step.img}
              style={{
                backgroundImage: "url(" + step.img + ")",
                // backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundSize: "contain",
                // backgroundRepeat: "repeat",
                overflowY: "hidden",
                overflowX: "hidden",
                display: "flex",
                height: 835,
                width: 1500,
                zIndex:-1,
                position: "relative",

                // padding: `${theme.spacing(2)}px ${theme.spacing(
                //   2
                // )}px ${theme.spacing(90)}px`,
                // height: "100vh",
                // color: "#f5f5f5"
              }}
              // data-caption="This is the caption"
            />
          ) : null
          // </div>
        )}
      </AutoPlaySwipeableViews>
    
    </div>
  );
}
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Home/>, rootElement)

export default withStyles(styles)(TransitionsModal);
