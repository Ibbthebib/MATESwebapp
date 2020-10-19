const styles = (theme) => ({
  main: {
    backgroundImage:
      "url(" +
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.roughguides.com%2Fwp-content%2Fuploads%2F2012%2F05%2F114280140.jpg&f=1&nofb=1" +
      ")",
    backgroundPosition: "center",
    height: 1000,
    width: "100%",
    display: "block",
    position: "relative",
  },

  paper: {
    borderRadius: "20px",
    background: "white",
    backgroundImage:
      "url(" +
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fbc%2Ff8%2F13%2Fbcf8136aceb71b743556e40c23f840b5.jpg&f=1&nofb=1" +
      ")",
    opacity: 0.9,
    [theme.breakpoints.up(400 + theme.spacing(5))]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    right: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    position: "relative",
    padding: `${theme.spacing(8)}px ${theme.spacing(9)}px ${theme.spacing(
      3
    )}px`,
  },
  chatTextBox: {
    width: "calc(150% - 5px)",
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
  avatar: {
    height: "50px",
    width: "auto",
  },
});

export default styles;
