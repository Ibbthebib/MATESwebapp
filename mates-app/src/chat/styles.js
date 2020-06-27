const styles = (theme) => ({
  content: {
    height: "300px",
    overflow: "auto",
    // padding: "25px",
    // marginLeft: "100px",
    boxSizing: "border-box",
    // overflow: "auto",

    overflowY: "scroll",
    marginTop: theme.spacing.unit * 3,

    // top: "50px",
    // width: "calc(100% - 300px)",
    position: "relative",
  },
  // paper: {
  //   // width: "calc(100% - 300px)",
  //   background: "white",

  //   // marginTop: theme.spacing.unit * ,
  //   display: "flex",
  //   flexDirection: "column",
  //   // alignItems: "center",
  //   overflow: "auto",
  //   overflowY: "scroll",
  //   // position: "absolute",
  //   padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 9}px ${
  //     theme.spacing.unit * 3
  //   }px`,
  // },

  userSent: {
    // alignItems: "center",

    float: "left",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#e7feff",
    color: "black",
    width: "300x",
    borderRadius: "10px",
  },

  friendSent: {
    float: "right",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#BADA55",
    color: "black",
    width: "300px",
    borderRadius: "10px",
  },

  chatHeader: {
    // width: "calc(50% - 50px)",
    height: "30px",
    backgroundColor: "#BADA55",
    // position: "center",
    marginLeft: "50px",
    fontSize: "18px",
    textAlign: "center",
    color: "black",
    paddingTop: "-5px",
    // boxSizing: "border-box",
    borderRadius: "50px",
  },
});

export default styles;
