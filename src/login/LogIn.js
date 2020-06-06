import React from "react";
import "./login.css";
import { makeStyles, Button, TextField } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import firebase from "../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function LogInImage() {
  return (
    <div className="img" alt="name">
      <img
        className="img"
        src="https://cdn.glitch.com/b56a20e6-825e-4fa9-afd6-163a64d6fbcc%2FUC-Davis-Football.png?v=1591377081864"
        alt="sign"
      />
    </div>
  );
}

function LogInField() {
  const classes = useStyles();
  var state = {
    email: "",
    password: "",
  };
  function changeHandler(event) {
    const val = event.target.value;

    if (event.target.id === "email") {
      state.email = val;
    }
    if (event.target.id === "password") {
      state.password = val;
    }
  }

  async function submit() {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password);

    window.location.href = "/main/" + user.user.uid;
  }
  return (
    <div className="LogInField">
      <div className="center">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="email"
            label="UCD Email"
            variant="outlined"
            //   value={state.name}
            onChange={changeHandler}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            hidden={true}
            onChange={changeHandler}
          />
        </form>
        <Button className="LogInButton" variant="contained" onClick={submit}>
          Log In
        </Button>
      </div>
    </div>
  );
}

export default class Log extends React.Component {
  // componentDidMount(){
  //   if
  // }
  render() {
    return (
      <div className="logInPage">
        <LogInImage />
        <LogInField />
      </div>
    );
  }
}
