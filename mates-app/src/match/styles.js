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
    opacity: 0.9,
    position: "relative",
    borderRadius: "20px",
    padding: `${theme.spacing(8)}px ${theme.spacing(9)}px ${theme.spacing(
      3
    )}px`,
    height: 650,
  },
  header: {
    color: "black",
    marginLeft: 30,
    fontWeight: 500,
  },
  age: {
    position: "absolute",
    color: "black",
    marginLeft: 190,
    marginTop: -30,
    fontWeight: 500,
  },
  profilesection: {
    color: "black",
    fontfamily: "montseratt",
    fontSize: 20,
  },
  biofield: {
    height: 100,
    clear: "both",
    padding: "10px",
    position: "relative",
    boxSizing: "borderbox",
    wordBreak: "break-word",
    marginTop: "10px",
    width: "250px",
  },

  like: {
    marginLeft: "auto",
    marginBottom: -40,
    color: "green",
    float: "none",
    position: "relative",
  },
  dislike: {
    marginRight: "auto",
    float: "none",
    color: "red",
    marginBottom: -40,
    position: "relative",
  },
});

export default styles;
