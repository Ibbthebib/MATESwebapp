
const styles = (theme) =>({
    main: {
    height: 835,
    width: 1500,
    display: "block", 
    position:"relative"
  },

  paper: {
    borderRadius: "20px",
    background: "white",
    backgroundImage: "url(" + 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fbc%2Ff8%2F13%2Fbcf8136aceb71b743556e40c23f840b5.jpg&f=1&nofb=1' + ")",
opacity:0.9,
    [theme.breakpoints.up(400 + theme.spacing(5))]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    position: "relative",
    padding: `${theme.spacing(8)}px ${theme.spacing(9)}px ${
      theme.spacing(3)
    }px`,
  },
  header: {
    color: "whitesmoke",
    position:"absolute",
    display: "block",
    marginLeft: 200,
    fontWeight: 800,
    zIndex:2000,

  },
  banner:{
    height:200 ,
    width:"auto",
    opacity:0.9,
     top:0,
     position:"absolute",
     zIndex:1000
  },
  root: {
    flexGrow: 1,
    color:"black"
  },
  paper1: {
    padding: theme.spacing(2),
    textAlign: 'center',
    wordWrap: "break-word",
    color: theme.palette.text.secondary,
  },
})
export default styles