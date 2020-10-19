import React, { Component, Fragment } from "react";
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

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import styles from "./styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MyLocationIcon from "@material-ui/icons/MyLocation";
/**
 * Myprofile is a class based react component that allows a user to edit their details which are located
 * here. Details such as name, location, bio, avatar. This allows a for a user friendly application.
 * It also allows othe users to know more about the user.
 *
 * @author Ibrahim Alzilitni
 */
const firebase = require("firebase");

class Myprofile extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      location: "",
      age: "",
      mainphoto: null,
      mainphotourl: "",
      photo2: "",
      photo3: "",
      photo4: "",
      bio: "",
      image: null,
      url: "",
      newName: "",
      newAge: "",
      newEmail: "",
      newBio: "",
      newLocation: "",
      tags: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper data-test="Paper" className={classes.paper}>
          <form className={classes.form} noValidate autoComplete="off">
            <FormControl data-test="FormControl" className={classes.form}>
              <Typography
                data-test="banner"
                variant="h5"
                className={classes.header}
              >
                {this.state.name + "'s "} profile
              </Typography>
              <img
                type="file"
                onChange={(e) => this.handleChange("mainphoto", e)}
                className={classes.profilepic}
                src={
                  this.state.mainphotourl ||
                  "http://via.placeholder.com/400x300"
                }
                alt="Uploaded images"
                height="100"
                width="100"
              />
              <input
                color="primary"
                type="file"
                onChange={(e) => this.handleChange("mainphoto", e)}
                id="icon-button-file"
                style={{ display: "none" }}
              />
              <label htmlFor="icon-button-file">
                <IconButton data-test="button" component="span">
                  <AddCircleOutlineIcon />
                </IconButton>
              </label>
              <br />
              <br />
              <Typography data-test="banner" className={classes.profilesection}>
                <div>
                  <TextField
                    data-test="fields"
                    label="Name"
                    position="relative"
                    type="email"
                    name="email"
                    variant="outlined"
                    ref="name"
                    onChange={(e) => this.updateDetails("name", e)}
                    value={this.state.name || ""}
                  >
                    {" "}
                  </TextField>{" "}
                </div>
                <br />
                <br />
                <TextField
                  data-test="fields"
                  label="Location"
                  position="relative"
                  variant="outlined"
                  value={this.state.location}
                  onChange={(e) => this.updateDetails("location", e)}
                ></TextField>
                <IconButton data-test="button" onClick={this.getLocation}>
                  <MyLocationIcon></MyLocationIcon>
                </IconButton>
                <br />
                <br />
                <TextField
                  data-test="fields"
                  label="Age"
                  position="relative"
                  variant="outlined"
                  value={this.state.age}
                  onChange={(e) => this.updateDetails("age", e)}
                ></TextField>

                <br />
                <br />
                <TextField
                  InputProps={{ classes: { input: classes.biofield } }}
                  value={this.state.bio}
                  position="absolute"
                  label="Bio"
                  variant="outlined"
                  onChange={(e) => this.updateDetails("bio", e)}
                ></TextField>
              </Typography>
              <AddPhotoAlternateOutlinedIcon
                className={classes.otherphotos}
              ></AddPhotoAlternateOutlinedIcon>
              <button
                data-test="button"
                position="fixed"
                onClick={this.handleUpload}
              >
                Save
              </button>
            </FormControl>
          </form>
        </Paper>
      </main>
    );
  }
  /**
   * getLocation method is used to fetch a users location using google api.
   */
  getLocation() {
    return fetch(
      "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDRX1tdBmx8UUuRoJNxS3caWot5Y5xv7dQ"
    ).then((res) => console.log(res.json()));
  }
  /**
   * The updateDetails method is used to update the state properties of the class myProfile.
   * Once these state properties are updated they can be used elsewhere.
   * The properties that can be updated are : the users name, the users location and the users bio.
   * @param {*} type the type of input.
   * @param {*} e the users input.
   */

  updateDetails(type, e) {
    switch (type) {
      case "name":
        this.setState({
          name: e.target.value,
          newName: e.target.value,
        });

        break;
      case "location":
        this.setState({
          location: e.target.value,
          newLocation: e.target.value,
        });
        break;
      case "bio":
        this.setState({
          bio: e.target.value,
          newBio: e.target.value,
        });
        break;
      case "age":
        this.setState({
          age: e.target.value,
          newAge: e.target.value,
        });
        break;
      default:
        break;
    }
  }
  /**
   * The handleChange method is used to extract an image and store in the state properties.
   * Thereafter, the users image will be used elsewhere.
   * @param {*} type type of photo.
   * @param {*} e event to prevent page from subsequent page reloading but also to get the image.
   */
  handleChange = (type, e) => {
    e.preventDefault();
    console.log("Im  here");
    if (e.target.files[0]) {
      switch (type) {
        case "mainphoto":
          this.setState({
            mainphoto: e.target.files[0],
          });
          break;
        case "image":
          this.setState({
            image: e.target.files[0],
          });
          break;
        default:
          break;
      }
    }
  };
  /**
   * The handleUpload method is used to upload the images found in the state properties above
   * into the database.
   * @param {*} e  to prevent subsequent page reloading.
   */
  handleUpload = (e) => {
    e.preventDefault();
    const { mainphoto, image } = this.state;
    if (mainphoto !== null) {
      const uploadTask = firebase
        .storage()
        .ref(`${this.state.email}/mainphoto`)
        .put(mainphoto);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.log(error);
        },
        () => {
          firebase
            .storage()
            .ref(this.state.email)
            .child("mainphoto")
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              this.setState({ mainphotourl: url });
            });
        }
      );
    }
    if (image !== null) {
      const uploadTask = firebase
        .storage()
        .ref(`${this.state.email}/picture1`)
        .put(image);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.log(error);
        },
        () => {
          firebase
            .storage()
            .ref(this.state.email)
            .child("picture1")
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              this.setState({ url: url });
            });
        }
      );
    }
  };
  /**
   * The componentDidMount react lifecycle method is used to load the users current profile details
   * upon the component mounting.The method loads the users current photo as well as
   * location, bio and name into the state properties which are then presented to the user.
   */
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        this.props.history.push("/login");
      } else {
        const downloading = firebase
          .storage()
          .ref(user.email)
          .child("mainphoto")
          .getDownloadURL()
          .then((url) => {
            this.setState({ mainphotourl: url });
          });
        const testing = await firebase
          .firestore()
          .collection("userProfile")
          .where("email", "==", user.email)
          .onSnapshot(async (result) => {
            const firebase = result.docs.map((doc) => doc.data());
            this.setState({
              name: firebase[0].name,
              location: firebase[0].location,
              age: firebase[0].age,
              bio: firebase[0].bio,
              email: user.email,
            });
          });
      }
    });
  };
  /**
   * The componentDidUpdate method is used to detect updates made by the user to their
   * details. Once an update is detetced the users details are updated in the database
   * allowing for up to date results.
   * @param {*} prevProps the previous properties of the class.
   * @param {*} prevState the previous state properties of the class.
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.newName !== this.state.newName) {
      firebase.auth().onAuthStateChanged(async (user) => {
        await firebase
          .firestore()
          .collection("userProfile")
          .doc(user.email)
          .set({
            name: this.state.newName,
            location: this.state.location,
            bio: this.state.bio,
            email: user.email,
            age: this.state.age,
            created: Date.now(),
          });
      });
    } else if (prevState.newLocation !== this.state.newLocation) {
      firebase.auth().onAuthStateChanged(async (user) => {
        await firebase
          .firestore()
          .collection("userProfile")
          .doc(user.email)
          .set({
            name: this.state.name,
            location: this.state.newLocation,
            bio: this.state.bio,
            email: user.email,
            age: this.state.age,
          });
      });
    } else if (prevState.newBio !== this.state.newBio) {
      firebase.auth().onAuthStateChanged(async (user) => {
        await firebase
          .firestore()
          .collection("userProfile")
          .doc(user.email)
          .set({
            name: this.state.name,
            location: this.state.location,
            bio: this.state.newBio,
            email: user.email,
            age: this.state.age,
          });
      });
    } else if (prevState.newAge !== this.state.newAge) {
      firebase.auth().onAuthStateChanged(async (user) => {
        await firebase
          .firestore()
          .collection("userProfile")
          .doc(user.email)
          .set({
            name: this.state.name,
            location: this.state.location,
            bio: this.state.bio,
            email: user.email,
            age: this.state.newAge,
          });
      });
    }
  }
}

export default withStyles(styles)(Myprofile);
