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
  paper: {
    // background: "#028090",
    // fontColor:"black",

    marginTop: theme.spacing.unit * 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 9}px ${
      theme.spacing.unit * 3
    }px`,
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
    color: "black",
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

  header: {
    color: "black",
    fontWeight: 500,
    // backgroundcolor: "red",
  },
});

export default styles;
