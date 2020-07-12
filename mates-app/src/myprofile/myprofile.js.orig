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
import MyLocationIcon from '@material-ui/icons/MyLocation';
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
      newEmail: "",
      newBio: "",
      newLocation: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    // this.updateDetails = this.updateDetails.bind(this);
  }
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <form className={classes.form} noValidate autoComplete="off">
            <FormControl className={classes.form}>
              <Typography variant="h5" className={classes.header}>
                <IconButton
                  component="span"
                  onClick={() => this.props.history.push("/dashboard")}

                  // onClick={this.props.history.push("/myprofile")}
                  // aria-label="profile"
                >
                  <ArrowBackIcon className={classes.backarrow} />
                </IconButton>
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
                // accept="image/*"
                type="file"
                onChange={(e) => this.handleChange("mainphoto", e)}
                id="icon-button-file"
                style={{ display: "none" }}
              />
              <label htmlFor="icon-button-file">
                <IconButton component="span">
                  <AddCircleOutlineIcon className={classes.mainphotoadd} />
                </IconButton>
              </label>
              <br />
              <br />
              <Typography className={classes.profilesection}>
                <div>
                  <TextField
                    label="Name"
                    position="relative"
                    // type="input"
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
                  label="Location"
                  position="relative"
                  variant="outlined"
                  value={this.state.location}
                  onChange={(e) => this.updateDetails("location", e)}
                ></TextField>
                <IconButton onClick={this.getLocation}>
                  <MyLocationIcon>
                    
                  </MyLocationIcon>
                </IconButton>
                <br />
                <br />
                <TextField
                  // variant="body1"
                  InputProps={{ classes: { input: classes.biofield } }}
                  // className={classes.biofield}
                  // type="text"
                  value={this.state.bio}
                  position="absolute"
                  // id="outlined-basic"
                  label="Bio"
                  variant="outlined"
                  onChange={(e) => this.updateDetails("bio", e)}
                ></TextField>
              </Typography>
              <AddPhotoAlternateOutlinedIcon
                className={classes.otherphotos}
              ></AddPhotoAlternateOutlinedIcon>
              <button position="fixed" onClick={this.handleUpload}>
                Save
              </button>
            </FormControl>
          </form>
        </Paper>
      </main>
    );
  }
  getLocation(){
    return fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDRX1tdBmx8UUuRoJNxS3caWot5Y5xv7dQ')
    .then(res => console.log(res.json()))
   
  }

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
      default:
        break;
    }
  }

  handleChange = (type, e) => {
    e.preventDefault();
    console.log("Im  here");
    if (e.target.files[0]) {
      // const image = e.target.files[0];
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
      // this.setState({ image });
    }
    console.log(this.state);
  };

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
        (snapshot) => {
          // progrss function ....
          //   const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          //   this.setState({progress});
        },
        (error) => {
          // error function ....
          console.log(error);
        },
        () => {
          // complete function ....
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
        (snapshot) => {
          // progrss function ....
          //   const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          //   this.setState({progress});
        },
        (error) => {
          // error function ....
          console.log(error);
        },
        () => {
          // complete function ....
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

  componentDidMount = () => {
    
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        this.props.history.push("/login");
      } else {
        const downloading =
          // complete function ....
          firebase
            .storage()
            .ref(user.email)
            .child("mainphoto")
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              this.setState({ mainphotourl: url });
            });
        console.log(this.state);

        const testing = await firebase
          .firestore()
          .collection("userProfile")
          .where("email", "==", user.email)
          .onSnapshot(async (result) => {
            const firebase = result.docs.map((doc) => doc.data());
            // console.log(firebase[0].email);
            this.setState({
              name: firebase[0].name,
              location: firebase[0].location,
              age: firebase[0].age,
              bio: firebase[0].bio,
              email: user.email,
            });
          });
          
        // firebase
        //   .firestore()
        //   .collection("userProfile")
        //   .doc(user.email)

        //   .update({
        //     test: this.state.newName,
        //     // message: this.state.text,
        //   });
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    
    // console.log(this.state.newName)
    if (prevState.newName !== this.state.newName) {
      // firebase.firebaseRef.off("value");
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

            // message: this.state.text,
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

            // message: this.state.text,
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

            // message: this.state.text,
          });
      });
    }
  }
}

export default withStyles(styles)(Myprofile);
