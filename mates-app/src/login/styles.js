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
  paper: {
    background: "whitesmoke",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(8)}px ${theme.spacing(9)}px ${theme.spacing(
      3
    )}px`,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(),
    color: "whitesmoke",
  },
  login: {
    background: "#70A37F",
    color: "white",
    marginTop: theme.spacing(3),
    fontWeight: 500,
  },
  hasAccountHeader: {
    width: "100%",
  },
  signUpLink: {
    width: "100%",
    textDecoration: "none",
    color: "#303f9f",
    fontWeight: "italic",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  noaccount: {
    color: "black",
  },
  header: {
    fontWeight: 500,
    position: "center",
  },
});

export default styles;
