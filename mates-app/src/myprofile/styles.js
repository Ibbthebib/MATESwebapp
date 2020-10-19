const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(5))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    background: "white",
    overflow: "auto",
    overflowY: "scroll",
    position: "relative",
    borderRadius: "20px",
    padding: `${theme.spacing(8)}px ${theme.spacing(9)}px ${theme.spacing(
      3
    )}px`,
    height: 700,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(),
    color: "whitesmoke",
  },
  header: {
    color: "black",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: 500,
  },
  profilepic: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: 100,
    borderRadius: "100px",
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
    width: "250px",
  
  },
  otherphotos: {
    color: "green",
    float: "none",
    margin: "0 auto",
    fontSize: 40,
  },
 

});

export default styles;
