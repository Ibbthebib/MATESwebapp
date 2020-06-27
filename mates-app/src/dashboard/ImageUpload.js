import React, {Component} from 'react';

const firebase = require("firebase");
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }
  
  render() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <main style={style}>
      <progress value={this.state.progress} max="100"/>
      <br/>
        <input type="file" onChange={this.handleChange}/>
        <button onClick={this.handleUpload}>Upload</button>
        <br/>
        <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
      </main>
    )
  }
  handleUpload = () => {
    const {image} = this.state;
    const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed', 
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
      firebase.storage().ref(this.state.email).child("mainphoto").getDownloadURL().then(url => {
          console.log(url);
          this.setState({url});
      })
  });
}
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        this.props.history.push("/login");
      } else {
        await firebase
          .firestore()
          .collection("chatsDB")
          .where("users", "array-contains", user.email)
          .onSnapshot(async (result) => {
            const firebaseChats = result.docs.map((doc) => doc.data());
            await this.setState({
              email: user.email,
              chats: firebaseChats,
            });
            // console.log(this.state);
          });
      }
      // console.log(this.state);
    });
  };
}

export default ImageUpload;