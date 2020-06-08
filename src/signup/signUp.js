import React from "react";
import "../signup/signup.css";
import signImg from "../loginUp.png";
import {
  makeStyles,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

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
  var userData = {
    name: "",
    email: "",
    password: "",
    gender: "female",
    college: "",
    major: "",
  };
  function changeHandler(event) {
    const val = event.target.value;
    if (event.target.id === "name") {
      userData.name = val;
    }
    if (event.target.id === "email") {
      userData.email = val;
    }
    if (event.target.id === "password") {
      userData.password = val;
    }
  }
  function FormField() {
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="name"
          label="Full name"
          variant="outlined"
          name="fullName"
          onChange={changeHandler}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          onChange={changeHandler}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          hidden="true"
          //   value={state.password}
          onChange={changeHandler}
        />
      </form>
    );
  }
  function GenderPicker() {
    const [value, setValue] = React.useState("female");

    const handleChange = (event) => {
      const val = event.target.value;
      setValue(event.target.value);
      userData.gender = val;
      console.log(val);
    };
    return (
      <div className="radioField">
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            className="radioGroup"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
  function College() {
    const classes = useStyles();
    const [age, setAge] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
      const val = event.target.value;
      setAge(event.target.value);
      userData.college = val;
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    return (
      <div className="dropdown">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            College
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="collegeSelector"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={"biology"}>Biology</MenuItem>
            <MenuItem value={"lettersandscience"}>Letters and Science</MenuItem>
            <MenuItem value={"engineering"}>Engineering</MenuItem>
            <MenuItem value={"agriculture"}>Agriculture</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
  function Major() {
    const classes = useStyles();
    const [age, setAge] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
      const val = event.target.value;
      setAge(event.target.value);
      userData.major = val;
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    return (
      <div className="dropdown">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Major</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="collegeSelector"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={"cs"}>CS</MenuItem>
            <MenuItem value={"bio"}>Biology</MenuItem>
            <MenuItem value={"math"}>Math</MenuItem>
            <MenuItem value={"economics"}>Economics</MenuItem>
            <MenuItem value={"chemistry"}>Chemistry</MenuItem>
            <MenuItem value={"physics"}>Physics</MenuItem>
            <MenuItem value={"psychology"}>Psychology</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
  function Btn() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={submit}>
          Sign Up
        </Button>
      </div>
    );
  }
  async function submit() {
    const photo =
      "https://firebasestorage.googleapis.com/v0/b/yearbook-eb32b.appspot.com/o/Screen%20Shot%202020-06-06%20at%205.07.42%20PM.png?alt=media&token=f1cc5aa1-830e-45ce-9753-4e581208c677";
    console.log(userData);
    var newUserUID;
    var name = userData.name;

    await firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .catch(function (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        // User is signed in.
        newUserUID = user.uid;
        await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .set({
            name: userData.name,
            email: userData.email,
            college: userData.college,
            major: userData.major,
            gender: userData.gender,
            photoURL: photo,
            searchKey: name[0] + name[1],
          });
        console.log(newUserUID);
        window.location.href = "/main/" + newUserUID;
      }
    });
  }
  return (
    <div className="signUpField">
      <div className="center">
        <FormField />
        <GenderPicker />
        <College />
        <Major />
        <Btn />
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
