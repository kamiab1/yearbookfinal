import React from "react";
import "../signup/signup.css";
import signImg from "../loginUp.png";
import { makeStyles, Button, TextField } from "@material-ui/core";

import firebase from "../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function SignUpImage() {
  return (
    <div className="img">
      <img className="img" src={signImg} alt="sign" />
    </div>
  );
}

function SignUpField() {
  const classes = useStyles();
  var state = {
    name: "",
    email: "",
    password: "",
  };
  function changeHandler(event) {
    const val = event.target.value;
    // console.log(val);

    // state.name = event.target.value.name;
    // state.email = event.target.v
    if (event.target.id === "name") {
      state.name = val;
    }
    if (event.target.id === "email") {
      state.email = val;
    }
    if (event.target.id === "password") {
      state.password = val;
    }
  }

  async function submit() {
    console.log(state);
    var newUserUID;
    await firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .catch(function (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        // User is signed in.
        newUserUID = user.uid;
        await firebase.firestore().collection("users").doc(user.uid).set({
          name: state.name,
          email: state.email,
        });
        console.log(newUserUID);
        window.location.href = "/main/" + newUserUID;
      } else {
        // User is signed out.
        // ...
      }
    });
  }
  return (
    <div className="signUpField">
      <img
        alt="heloooo"
        className="MobileLogo"
        src="https://cdn.glitch.com/b56a20e6-825e-4fa9-afd6-163a64d6fbcc%2FUCD_Yearbook_logo-01%20Copy%202.png?v=1591378938485"
      ></img>
      <div className="center">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Full name"
            variant="outlined"
            name="fullName"
            //   value={state.name}
            onChange={changeHandler}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            //   value={state.email}
            onChange={changeHandler}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            name="password"
            hidden="true"
            //   value={state.password}
            onChange={changeHandler}
          />
        </form>
        <Button variant="contained" color="primary" onClick={submit}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default class Sign extends React.Component {
  render() {
    return (
      <div className="signUpPage">
        <SignUpImage />
        <SignUpField />
      </div>
    );
  }
}
