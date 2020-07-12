const styles = (theme) => ({
  content: {
    backgroundImage: `url(${require("../home/goodtime.jpg")})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "repeat",

    // marginTop: theme.spacing.unit * 10,
    display: "flex",
    // height:"auto",
    // width:"auto",
// position:"relative",    // flexDirection: "column",
    // alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${
      theme.spacing(90)
    }px`,
  },

  header:{
      fontSize:30,
      fontWeight:700,
      color:"maroon",
      fontFamily: "'Montserrat', sans-serif",
      flexBasis: '10%',
      flexShrink: 0,
  }
});

export default styles;
