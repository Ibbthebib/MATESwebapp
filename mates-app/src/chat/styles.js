const styles = (theme) => ({
  content: {
    height: "300px",
    width: 300,
    overflowY: "scroll",
    marginTop: theme.spacing(3),
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
    borderRadius: "50px",
  },
  root: {
    height: 60,
    position: "static",
    width: "230px",
    boxShadow: "0px 0px 2px whitesmoke",
  },
  listRoot: {
    height: "600px",
    overflowY: "hidden",
    overflowX: "hidden",
    overflowY: "scroll",
    position: "static",
    width: "230px",
    boxShadow: "0px 0px 2px whitesmoke",
  },
  personIcon: {
    fontsize: 100,
    marginLeft: -230,
    position: "absolute",
  },
});

export default styles;
