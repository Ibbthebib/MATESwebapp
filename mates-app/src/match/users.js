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
const firebase = require("firebase");
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const tutorialSteps = [
  // {
  //   label: 'San Francisco – Oakland Bay Bridge, United States',
  //   imgPath:
  //     'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  // },
  {},
];
// const {classes} = this.props

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
      mountcheck : ""
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.header}>
            {this.state.name}
          </Typography>
          <Typography variant="h6" className={classes.age}>
            {this.state.age}
          </Typography>
          {/* {SwipeableTextMobileStepper()} */}
          <SwipeableTextMobileStepper></SwipeableTextMobileStepper>
          <br />
          <FormControl>
            <Typography className={classes.profilesection}>
              {this.state.bio}
            </Typography>

            <IconButton
              className={classes.like}
              onClick={() => this.handleNext()}
            >
              <ThumbUpIcon></ThumbUpIcon>
            </IconButton>
            <IconButton className={classes.dislike}
            onClick={()=> this.setState({
              index: this.state.index + 1
            })}>
              <ThumbDownIcon></ThumbDownIcon>
            </IconButton>
          </FormControl>
        </Paper>
      </main>
    );
  }

  static getDerivedStateFromProps(props, state) {
    // let testing = ""
    // firebase
    // .firestore()
    // .collection("Matching")
    // .where("liked", "array-contains", this.state.user)
    // .where("email", "==", this.state.email)
    // .get()
    // .then((snapshot) => {
    //   snapshot.forEach((doc) => {
    //     console.log(doc.data().liked);
    //     testing = doc.data().liked;

    //     //ADD THIS TO STATE AND THEN SAY IF STATE IS NOT EMPTY THEN START MATCH PREVEMAIL WITH THIS
    //   });

    // });
    return;
    {
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.newName);
    // console.log(prevState.user);
    // console.log(this.state.user);
    // console.log(prevState.email);
    // console.log(this.state.email);
    // let matched = "";
    // let tracking = this.state.matched
    console.log(prevProps);

    const { matched, index } = this.state;
    if (matched !== prevState.matched) {
      alert("You have a new match " + this.state.name);
      const docKey = [this.state.user, prevState.email].sort().join(":");
      console.log(prevState.user);
      console.log(this.state.user);
      console.log(prevState.email);
      console.log(this.state.email);
      firebase
        .firestore()
        .collection("chatsDB")
        .doc(docKey)
        .set({
          messages: firebase.firestore.FieldValue.arrayUnion({
            // sender: prevState.email,
            message: "New chat",
          }),
          users: firebase.firestore.FieldValue.arrayUnion(
            prevState.email,
            prevState.user
          ),
        });
    }
    if (prevState.email !== this.state.email) {
      firebase
        .storage()
        .ref(this.state.email)
        .child("mainphoto")
        .getDownloadURL()
        .then((url) => {
          // console.log(url);
          tutorialSteps.pop();
          tutorialSteps.push({ imgPath: url });
          this.setState({ mainphotourl: url });
        });
      const downloading1 = firebase
        .storage()
        .ref(this.state.email)
        .child("lee.png")
        .getDownloadURL()
        .then((url) => {
          tutorialSteps.push({ imgPath: url });

          console.log(url + " 2");
          this.setState({ mainphotourl: url });
        });

      console.log(this.state);
    }
    if (prevState.index !== this.state.index) {
      console.log("were in updating index");
      
      const checkingIfExists = firebase
      .firestore()
      .collection("Matching")
      .where("email", "==", this.state.user)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log("in mount stage " + doc.data().liked);
           this.setState({
             mountcheck: doc.data().liked
           }) 
          // if(doc.data().liked.includes(this.state.email)){
          //   console.log("yes it includes ")
          //   this.setState({
          //     index: this.state.index + 1,
          //   });
          // } 
          //ADD THIS TO STATE AND THEN SAY IF STATE IS NOT EMPTY THEN START MATCH PREVEMAIL WITH THIS
        });})
      //Adding to liked list
      firebase
        .firestore()
        .collection("Matching")
        .doc(this.state.user)
        .get()
        .then(function (doc) {
          doc.exists
            ? firebase
                .firestore()
                .collection("Matching")
                .doc(prevState.user)
                .update({
                  email: prevState.user,
                  liked: firebase.firestore.FieldValue.arrayUnion(
                    prevState.email
                  ),
                })
            : firebase
                .firestore()
                .collection("Matching")
                .doc(prevState.user)
                .set({
                  email: prevState.user,
                  liked: firebase.firestore.FieldValue.arrayUnion(
                    prevState.email
                  ),
                });
        });

      firebase
        .firestore()
        .collection("userProfile")

        .onSnapshot((result) => {
          const firebase = result.docs.map((doc) => doc.data());
          // console.log(firebase[0].email);
          if (firebase[index].email === this.state.user || this.state.mountcheck.includes(firebase[index].email) ) {
            this.setState({ index: this.state.index + 1 });
          } else{
          this.setState({
            name: firebase[index].name,
            location: firebase[index].location,
            age: firebase[index].age,
            bio: firebase[index].bio,
            email: firebase[index].email,
          });}
          console.log(this.state);
        });
    }
  }

  handleNext() {
    // let match = this.state.matched;
    const checkingIfExists = firebase
    .firestore()
    .collection("Matching")
    .where("liked", "array-contains", this.state.email)
    .where("email", "==", this.state.user)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data().liked);
        if(doc.data().liked.includes(this.state.email)){
          console.log("yes it includes ")
          this.setState({
            index: this.state.index + 1,
          });
        } 
        //ADD THIS TO STATE AND THEN SAY IF STATE IS NOT EMPTY THEN START MATCH PREVEMAIL WITH THIS
      });
     
    });
    const testing = firebase
      .firestore()
      .collection("Matching")
      .where("liked", "array-contains", this.state.user)
      .where("email", "==", this.state.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data().liked);
        
          this.setState({
            matched: doc.data().liked,
          });
        
          //ADD THIS TO STATE AND THEN SAY IF STATE IS NOT EMPTY THEN START MATCH PREVEMAIL WITH THIS
        });
        // this.state.matched.includes(this.state.email)
        // firebase
        //   .firestore()
        //   .collection("Matched")
        //   .get()
        //   .then((snap) => {
        //     console.log(snap.size)
        //   });

        this.setState({ index: this.state.index + 1 });

      });
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        this.props.history.push("/login");
      } else {
        const { index } = this.state;
        let whatever  = ""
        const checkingIfExists = firebase
    .firestore()
    .collection("Matching")
    .where("email", "==", user.email)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log("in mount stage " + doc.data().liked);
         this.setState({
           mountcheck: doc.data().liked
         }) 
        // if(doc.data().liked.includes(this.state.email)){
        //   console.log("yes it includes ")
        //   this.setState({
        //     index: this.state.index + 1,
        //   });
        // } 
        //ADD THIS TO STATE AND THEN SAY IF STATE IS NOT EMPTY THEN START MATCH PREVEMAIL WITH THIS
      });
     
    });

        const testing = await firebase
          .firestore()
          .collection("userProfile")

          .onSnapshot(async (result) => {
            const firebase = result.docs.map((doc) => doc.data());
            // console.log(firebase[0].email);
            if (firebase[index].email === user.email || this.state.mountcheck.includes(firebase[index].email) ) {
             console.log("yh working but not quite")
            //  this.setState({index: this.state.index+ 1})
            }
            
            // conditional on whether the user already has the email in liekd list already.

            this.setState({
              name: firebase[index].name,
              location: firebase[index].location,
              age: firebase[index].age,
              bio: firebase[index].bio,
              email: firebase[index].email,
              user: user.email,
            });
            console.log(this.state);
          });
      }
    });
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 600,
    // flexGrow: 1,
  },
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
    // display: 'block',
    maxWidth: 600,
    overflow: "hidden",
    width: "100%",
  },
  stepper: {
    // alignItems: "center",
    position: "static",
    marginLeft: 105,
    // marginRight:"auto"
  },
}));

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
    <div className={classes.root}>
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
              <img
                className={classes.img}
                src={step.imgPath}
                // alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        className={classes.stepper}
        position="static"
        // variant="text"
        activeStep={activeStep}
      />
    </div>
  );
}

export default withStyles(styles)(Users);
