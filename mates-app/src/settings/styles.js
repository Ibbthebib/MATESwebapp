const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(5))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(),
    color: "whitesmoke",
  },
  submit: {
    background: "#70A37F",
    color: "white",
    marginTop: theme.spacing(3),
    fontWeight: 500,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  updated: {
    color: "green",
    textAlign: "center",
  },
  paper: {
    background: "white",
    overflow: "auto",
    overflowY: "scroll",
    position: "relative",
    borderRadius: "20px",
    padding: `${theme.spacing(8)}px ${theme.spacing(9)}px ${
      theme.spacing(3)
    }px`,
    height: 650,
  },
  header: {
    color: "black",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: 500,
  },
  content: {
    overflowY: "hidden",
    overflowX: "hidden",
    display: "flex",
    height: "auto",
    width: "auto",
    position: "relative",
  },

  banner: {
    color: "white",
    position: "absolute",
    top: "40%",
    left: "40%",
    zIndex: 1000,
  },
});

export default styles;
