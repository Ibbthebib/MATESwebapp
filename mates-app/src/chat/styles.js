const styles = (theme) => ({
  content: {
    height: "300px",
    overflow: "auto",
    boxSizing: "border-box",
    overflowY: "scroll",
    marginTop: theme.spacing.unit * 3,
    position: "relative",
  },

  userSent: {
    float: "left",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#e7feff",
    color: "black",
    width: "300x",
    borderRadius: "20px",
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
    width: "100x",
    borderRadius: "20px",
    // marginRight:"-50px"
  },

  chatHeader: {
    width: "calc(110% - 50px)",
    height: "30px",
    backgroundColor: "#BADA55",
    marginLeft: "50px",
    fontSize: "18px",
    textAlign: "center",
    color: "black",
    paddingTop: "-5px",
    // boxSizing: "border-box",
    borderRadius: "50px",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 0,
    position: "static",
    marginLeft: -250,
    width: "230px",
    // boxShadow: '0px 0px 2px black'
  },
  mainphoto: {
    fontsize: 100,
    marginLeft: -230,
    position: "absolute",
  },
});

export default styles;
