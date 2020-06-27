const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  profilesection: {
    color: "black",
  },
  biofield: {
    height: 100,
    clear: "both",
    padding: "10px",
    position: "relative",
    boxSizing: "borderbox",
    wordBreak: "break-word",
    marginTop: "10px",
    // backgroundColor: "#BADA55",
    // color: "black",
    width: "250px",
    // borderRadius: "10px",
    // whiteSpace:"normal",
    // overflowWrap: "break-word"

    // marginBottom: theme.spacing.unit * 10,
  },
  backarrow: {
    fontSize: 30,
    position: "left",
    marginRight:theme.spacing.unit * 2,
  },
  paper: {
    background: "white",
    // width: "calc(100% - 10px)",

    // marginTop: theme.spacing.unit * 2,
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    overflow: "auto",
    overflowY: "scroll",
    position: "relative",
    borderRadius: "20px",

    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 9}px ${
      theme.spacing.unit * 3
    }px`,
    height: 650,
  },
  chatTextBox: {
    width: "calc(100% - 10px)",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit,
    color: "whitesmoke",
  },
  submit: {
    background: "#70A37F",
    color: "white",
    marginTop: theme.spacing.unit * 3,
    fontWeight: 500,
  },
  hasAccountHeader: {
    width: "100%",
  },
  logInLink: {
    width: "100%",
    textDecoration: "none",
    color: "#303f9f",
    fontWeight: "italic",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  profilepic: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width:  100,
    borderRadius: "100px",

  },
  mainphoto: {
    color: "green",

    float: "none",
    margin: "0 auto",
// position:"relative",
marginLeft:theme.spacing.unit * 9,

    fontSize: 100,
  },
  otherphotos: {
    color: "green",

    float: "none",
    margin: "0 auto",

    fontSize: 40,
  },
  header: {
    // textAlign: "center",
    color: "black",
    display: "block",
    // marginLeft: "auto",
    marginRight: "auto",
    fontWeight: 500,
    // backgroundcolor: "red",
  },
});

export default styles;
