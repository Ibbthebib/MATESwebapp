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
  Link,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

/**
 * The Productivty class based component is used to provide the user wiht local weather and
 * weather based activties to perform.
 * @author Ibrahim Alzilitni
 */
const firebase = require("firebase");
class Productivity extends Component {
  constructor() {
    super();
    this.state = {
      weather: 0,
      location: "",
    };
  }


  /**
   * The render function will present the user with three possible experiences depending on the weather.
   * If the local weather is above 13 degrees than outdoor exercise will be presented to promote good wellbeing.
   * If the lcoal wetaher is below or equal to 13 degrees than indoor exercies will be recommended. 
   * If the users location cannot be found the suer will be indicated.
   */
  render() {
    const { classes } = this.props;
    if (this.state.weather === 0) {
      return (
        <main>
          <CssBaseline></CssBaseline>
          <Typography data-test='banner' variant="h3" className={classes.header}>
            Try a new location please.
          </Typography>
          <img
            className={classes.banner}
            src="https://9to5mac.com/wp-content/uploads/sites/6/2019/12/iPhone-11-Pro-still-collects-location-data-even-when-told-not-to.jpg?quality=82&strip=all&w=1500"
          />
          <Paper data-test='Paper' className={classes.paper}>
            <br />
            <br />
            <br />
            <br />
          </Paper>
        </main>
      );
    }
    if (this.state.weather <= 13) {
      return (
        <main>
          <CssBaseline></CssBaseline>
          <Typography data-test='banner' variant="h3" className={classes.header}>
            {"Temp: " + this.state.weather}
          </Typography>
          <img
            className={classes.banner}
            src="https://www.watlingmedicalpractice.nhs.uk/wp-content/uploads/sites/20/2019/01/Winter-2019-Banner.jpg"
          ></img>
          <Paper className={classes.paper}>
            <br />
            <br />
            <br />
            <br />
            <Typography data-test='banner'> How about some indoor exercise today?</Typography>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=XvClcfVqwXA"
                    className={classes.paper1}
                  >
                    <img
                      height="100"
                      width="100"
                      src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimage.shutterstock.com%2Fz%2Fstock-vector-illustration-of-cartoon-boy-exercise-in-the-park-53281243.jpg&f=1&nofb=1"
                    ></img>
                    Walking
                  </Button>
                </Grid>
                <Grid item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=v7AYKMP6rOE"
                    className={classes.paper1}
                  >
                    <img
                      height="100"
                      width="100"
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fillustrations%2F20190319%2Fourmid%2Fpngtree-fitness-outdoor-yoga-cartoon-character-warm-color-landscape-illustration-series-yoga-png-image_21877.jpg&f=1&nofb=1"
                    ></img>
                    Yoga
                  </Button>
                </Grid>
                <Grid item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=fS_A8xle1xg"
                    className={classes.paper1}
                  >
                    <img
                      height="100"
                      width="100"
                      src="https://static01.nyt.com/images/2020/03/23/reader-center/23burst-runoutside/23burst-runoutside-superJumbo.jpg"
                    ></img>
                    Running
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=ml6cT4AZdqI"
                    className={classes.paper1}
                  >
                    <img
                      height="100"
                      width="100"
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F2GgKm_54kXI%2Fmaxresdefault.jpg&f=1&nofb=1"
                    ></img>
                    HIIT
                  </Button>
                </Grid>
                <Grid item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=6LeKFE_aB4I"
                    className={classes.paper1}
                  >
                    <img
                      height="100"
                      width="100"
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.newyorker.com%2Fphotos%2F5c8050776531882c97e5c2d2%2Fmaster%2Fw_727%2Cc_limit%2F190318_r33883.gif&f=1&nofb=1"
                    ></img>
                    Extreme yoga{" "}
                  </Button>
                </Grid>
                <Grid item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=Rj2IubFfEqY"
                    className={classes.paper1}
                  >
                    <img
                      height="100"
                      width="100"
                      src="https://image.freepik.com/free-vector/happy-dancing-girl-woman-dancing-outdoor-illustration-morning-dance-aerobic-fitness-dance_176448-2.jpg"
                    ></img>
                    Zumba
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </main>
      );
    } else if (this.state.weather > 13) {
      return (
        <main>
          <CssBaseline></CssBaseline>
          <Typography data-test='banner' variant="h3" className={classes.header}>
            {"Temp: " + this.state.weather}
          </Typography>
          <img
            className={classes.banner}
            src="https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-green-meadow-paper-plane-cartoon-background-rainbow-image_11718.jpg"
          ></img>
          <Paper data-test='Paper' className={classes.paper}>
            <br />
            <br />
            <br />
            <br />
            <Typography data-test='banner'> How about some outdoor exercise today?</Typography>
            <div data-test='div'className={classes.root}>
              <Grid  container spacing={3}>
                <Grid item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=oAPCPjnU1wA"
                    className={classes.paper1}
                  >
                    <img
                      height="100"
                      width="100"
                      src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimage.shutterstock.com%2Fz%2Fstock-vector-illustration-of-cartoon-boy-exercise-in-the-park-53281243.jpg&f=1&nofb=1"
                    ></img>
                    Exercise
                  </Button>
                </Grid>
                <Grid data-test='image' item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=tClx0pMMQUs"
                    className={classes.paper1}
                  >
                    <img data-test='img'
                      height="100"
                      width="100"
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fillustrations%2F20190319%2Fourmid%2Fpngtree-fitness-outdoor-yoga-cartoon-character-warm-color-landscape-illustration-series-yoga-png-image_21877.jpg&f=1&nofb=1"
                    ></img>
                    Yoga
                  </Button>
                </Grid>
                <Grid item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=QaipMZ9TDiI"
                    className={classes.paper1}
                  >
                    <img
                      height="100"
                      width="100"
                      src="https://static01.nyt.com/images/2020/03/23/reader-center/23burst-runoutside/23burst-runoutside-superJumbo.jpg"
                    ></img>
                    Running
                  </Button>
                </Grid>
              </Grid>
              <Grid data-test='grid' container spacing={3}>
                <Grid item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=TkaYafQ-XC4"
                    className={classes.paper1}
                  >
                    <img
                      height="100"
                      width="100"
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F2GgKm_54kXI%2Fmaxresdefault.jpg&f=1&nofb=1"
                    ></img>
                    HIIT
                  </Button>
                </Grid>
                <Grid item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=YtuzNaaWZRQ"
                    className={classes.paper1}
                  >
                    <img
                      height="100"
                      width="100"
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.newyorker.com%2Fphotos%2F5c8050776531882c97e5c2d2%2Fmaster%2Fw_727%2Cc_limit%2F190318_r33883.gif&f=1&nofb=1"
                    ></img>
                    Extreme yoga{" "}
                  </Button>
                </Grid>
                <Grid item xs={4} spacing={3}>
                  <Button
                    variant="link"
                    href="https://www.youtube.com/watch?v=TLzosD5trIU"
                    className={classes.paper1}
                  >
                    <img
                      height="100"
                      width="100"
                      src="https://image.freepik.com/free-vector/happy-dancing-girl-woman-dancing-outdoor-illustration-morning-dance-aerobic-fitness-dance_176448-2.jpg"
                    ></img>
                    Zumba
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </main>
      );
    }
  }
  /**
   * The componentDidMount is used to set the location in the state properties of the class.
   * Thereafter, weather can be provided and activties.
   * @param {*} props class based properties.
   */
  componentDidMount(props) {
    let location = "";
    firebase
      .firestore()
      .collection("userProfile")
      .where("email", "==", this.props.user)
      .onSnapshot(async (result) => {
        const firebase = result.docs.map((doc) => doc.data());
        this.setState({
          location: firebase[0].location,
        });
      });
  }
  /**
   * The componentDidUpdate method is used once an update to the state is made.
   * In this case the users location is updated and the method employs utilities to access
   * a weather API and provide forecast for the user.
   * @param {*} prevProp are the classes previous properties.
   * @param {*} prevState are the classes previous state properties.
   */
  componentDidUpdate(prevProp, prevState) {
    if (prevState.location !== this.state.location) {
      const api = {
        key: "286ff33242ee221fdecf5ecca14d61e7",
        base: "https://api.openweathermap.org/data/2.5/",
      };
      fetch(
        `${api.base}weather?q=${this.state.location}&units=metric&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            weather: result.main.temp,
          });
        });
    }
    if (prevState.weather !== this.state.weather) {
      this.forceUpdate();
    }
  }
}
export default withStyles(styles)(Productivity);
