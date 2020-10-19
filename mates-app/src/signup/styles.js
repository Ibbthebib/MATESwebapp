const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", 
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(8)}px ${theme.spacing(9)}px ${
      theme.spacing(3)
    }px`,
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
  },
});

export default styles;
