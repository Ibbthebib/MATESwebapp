import React, { Component } from 'react';
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
  const firebase = require("firebase");
class Users extends Component{


    constructor(){
        super()
        this.state = {

            name:"",
            location:"",
            age:'',
            bio:'',
        }
    }
    render(){
        return( <main>
            <CssBaseline></CssBaseline>
            <Paper>

            </Paper>
        </main>)
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            this.props.history.push("/login");
          } else {
            // const downloading =
              // complete function ....
            //   firebase
            //     .storage()
            //     .ref(user.email)
            //     .child("mainphoto")
            //     .getDownloadURL()
            //     .then((url) => {
            //       console.log(url);
            //       this.setState({ mainphotourl: url });
            //     });
            // console.log(this.state);
    
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
                //   email: user.email,
                });
                  console.log(this.state);

              });
        
          }
        });
      };
   
}

export default Users;