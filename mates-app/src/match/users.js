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
import IconButton from "@material-ui/core/IconButton";
import styles from "./styles";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
/**
 * The Users class based component is used to present a user with possible users to browse through.
 * This is done by searching retreiving possible users that the user hasnt already browsed through
 * and presenting these users in a friendly manner. Thereafer has the ability to match with these users
 * if they have interest else the other others will have the ability to match with the current user if has interest.
 * @author Ibrahim Alzilitni
 */
const firebase = require("firebase");
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const tutorialSteps = [{}];

class Users extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      location: "",
      age: "",
      bio: "",
      email: "",
      mainphotourl: "",
      index: 0,
      user: "",
      matched: "",
      mountcheck: "",
      sameprofile: false,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleNope = this.handleNope.bind(this);
  }
  render() {
    const { classes } = this.props;
    if (this.state.sameprofile === true) {
      return (
        <main className={classes.main}>
          <CssBaseline></CssBaseline>
          <Paper className={classes.paper}>
            <Typography variant="h2"> No more matches!</Typography>
          </Paper>
        </main>
      );
    }
    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper data-test="Paper" className={classes.paper}>
          <Typography
            data-test="banner"
            variant="h6"
            className={classes.header}
          >
            {this.state.name}
          </Typography>
          <Typography data-test="banner" variant="h6" className={classes.age}>
            {this.state.age}
          </Typography>
          <SwipeableTextMobileStepper data-test="imgarray"></SwipeableTextMobileStepper>
          <br />
          <FormControl>
            <Typography data-test="banner" className={classes.profilesection}>
              {this.state.bio}
            </Typography>

            <IconButton
              data-test="button"
              className={classes.like}
              onClick={() => this.handleNext()}
            >
              <ThumbUpIcon></ThumbUpIcon>
            </IconButton>
            <IconButton
              data-test="button"
              className={classes.dislike}
              onClick={() => this.handleNope()}
            >
              <ThumbDownIcon></ThumbDownIcon>
            </IconButton>
          </FormControl>
        </Paper>
      </main>
    );
  }
  /**
   * handleNext function is used for when a user has interest with another user. The method
   * updates the users match details within the database and adds the user of interest details into the
   * current users match details. The method also checks if a the current user is contained in the user of interests match details,
   * if so, then the system creates a connection in the database and allows the users to chat.
   * The method also updates the tracking variable in the match details of the user so that another can be presented after.
   */
  handleNext() {
    console.log("WERE HERE");
    const docKey = [this.state.user, this.state.email].sort().join(":");
    console.log("WERE HERE1");
    console.log(this.state.user);
    const addingToLikedList = firebase
      .firestore()
      .collection("Matching")
      .where("email", "==", this.state.user)
      .get()
      .then((doc) => {
        doc.size > 0
          ? firebase
              .firestore()
              .collection("Matching")
              .doc(this.state.user)
              .update({
                email: this.state.user,
                liked: firebase.firestore.FieldValue.arrayUnion(
                  this.state.email
                ),
                index: this.state.index,
                timestamp: Date.now(),
              })
          : firebase
              .firestore()
              .collection("Matching")
              .doc(this.state.user)
              .set({
                email: this.state.user,
                liked: firebase.firestore.FieldValue.arrayUnion(
                  this.state.email
                ),
                index: 0,
                timestamp: Date.now(),
              });
      });
    const checkingIfExists = firebase
      .firestore()
      .collection("Matching")
      .where("email", "==", this.state.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().liked.includes(this.state.user)) {
            alert("New match");
            const creatingchat = firebase
              .firestore()
              .collection("chatsDB")
              .doc(docKey)
              .set({
                messages: firebase.firestore.FieldValue.arrayUnion({
                  sender: "Server",
                  message: "New chat",
                }),
                users: firebase.firestore.FieldValue.arrayUnion(
                  this.state.email,
                  this.state.user
                ),
                timestamp: Date.now(),
              });
          }
          if (this.state.index < this.state.size) {
            this.setState({ index: this.state.index + 1 });
          } else {
            this.setState({ samePRofile: true });
          }
        });
      });
  }
  /**
   * The handleNope method is used when a user does not have interest in a presented user. The method simply updates the
   * users tracking index in the database passing by the presented user so that another user can be presented.
   */
  handleNope() {
    const updatingTrackingIndex = firebase
      .firestore()
      .collection("Matching")
      .where("email", "==", this.state.user)
      .get()
      .then((doc) => {
        doc.size > 0
          ? firebase
              .firestore()
              .collection("Matching")
              .doc(this.state.user)
              .update({
                index: this.state.index,
                timestamp: Date.now(),
              })
          : firebase
              .firestore()
              .collection("Matching")
              .doc(this.state.user)
              .set({
                email: this.state.user,

                index: 0,
                timestamp: Date.now(),
              });
      });

    const checkingIfExists = firebase
      .firestore()
      .collection("Matching")
      .where("email", "==", this.state.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (this.state.index < this.state.size) {
            this.setState({ index: this.state.index + 1 });
          }
        });
      });
  }
  /**
   * The componentDidUpdate method here performs two actions. the first is that the method checks for an updated tracking variable
   * (index). If this is found then the method will load new details into the state properties of the component above from the
   * database. Thereafter, the component checks that the email has also been updated and extracts the presented users avatar into the states
   * component also so that all the information is presented to the user at one point.
   * @param {*} prevProps the previous properties of the component.
   * @param {*} prevState the previous state properties of the component.
   */
  componentDidUpdate = (prevProps, prevState) => {
    const { index } = this.state;

    if (this.state.email !== prevState.email) {
      firebase
        .storage()
        .ref(this.state.email)
        .child("mainphoto")
        .getDownloadURL()
        .then((url) => {
          tutorialSteps = [{}];
          tutorialSteps.push({ imgPath: url });
          tutorialSteps.splice({}, 1);
          this.setState({
            mainphotourl: url,
            name: this.state.name,
            location: this.state.location,
            age: this.state.age,
            bio: this.state.bio,
          });
        });
      firebase
        .storage()
        .ref(this.state.email)
        .child("lee.png")
        .getDownloadURL()
        .then((url) => {
          tutorialSteps.push({ imgPath: url });
          this.forceUpdate();
        });
      firebase
        .storage()
        .ref(this.state.email)
        .child("naruto.png")
        .getDownloadURL()
        .then((url) => {
          tutorialSteps.push({ imgPath: url });
          console.log(tutorialSteps);
        });
      this.forceUpdate();
    }

    if (prevState.index !== this.state.index) {
      const testing = firebase
        .firestore()
        .collection("userProfile")
        .onSnapshot((result) => {
          const firebase = result.docs.map((doc) => doc.data());
          if (index >= result.docs.length) {
            //UNLOAD the no more profiles in state
            this.setState({ sameprofile: true });
            this.forceUpdate();
          } else {
            if (firebase[index].email === this.state.user) {
              this.setState({ index: this.state.index + 1 });
            }
            this.setState({
              name: firebase[index].name,
              location: firebase[index].location,
              age: firebase[index].age,
              bio: firebase[index].bio,
              email: firebase[index].email,
            });
          }
        });
    }
  };
  /**
   * The componentDidMount method is used to first of all check whether a user has a previous tracking variable in order
   * to load up different user profiles. If not then the method creates a tracking variable for the user and adds into the state
   * properties. If the user does then it sets this into components state properties. Thereafter the tracking varibale is used to
   * load up a users profile from the database.
   */
  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      console.log(user);
      this.setState({ user: user.email });
      if (!user) {
        this.props.history.push("/login");
      } else {
        const { index } = this.state;
        let whatever = "";
        const checkingIfExists = firebase
          .firestore()
          .collection("Matching")
          .where("email", "==", user.email)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              if (doc.data().index !== undefined) {
                this.setState({
                  index: doc.data().index,
                });
              } else {
                this.setState({
                  index: 0,
                });
              }
            });
          });

        const profiles = firebase
          .firestore()
          .collection("userProfile")
          .onSnapshot((result) => {
            this.setState({ size: result.docs.length });
            const firebase = result.docs.map((doc) => doc.data());
            if (index >= result.docs.length) {
              this.setState({ sameprofile: true });
            } else if (firebase[index].email === undefined) {
              this.setState({ sameprofile: true });
            } else if (firebase[index].email === user.email) {
              this.setState({ index: this.state.index + 1 });
            } else {
              this.setState({
                name: firebase[index].name,
                location: firebase[index].location,
                age: firebase[index].age,
                bio: firebase[index].bio,
                email: firebase[index].email,
                // user: user.email,
              });
            }
          });
      }
    });
  }
}
const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  nextarrow: {
    marginLeft: 270,
    height: 400,
    position: "absolute",
  },
  backarrow: {
    marginLeft: -70,
    height: 400,
    position: "absolute",
  },
  img: {
    height: 255,
    maxWidth: 600,
    overflow: "hidden",
    width: "100%",
  },
  stepper: {
    position: "static",
    marginLeft: 105,
  },
}));
/**
 * This function deals with implementing the carousel feature where the users being browsed images change
 * depending on the number of images that have been uploaded.
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
      <Button
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
        Back
      </Button>
      <Button
        className={classes.nextarrow}
        size="small"
        onClick={handleNext}
        disabled={activeStep === maxSteps - 1}
      >
        Next
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </Button>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        className={classes.stepper}
        position="static"
        activeStep={activeStep}
      />
    </div>
  );
}

export default withStyles(styles)(Users);
