import React, { useState, useEffect } from "react";
import "./main.css";

import {
  makeStyles,
  Button,
  Avatar,
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
// import GlobalFonts from './fonts/fonts';
//<link href="//db.onlinewebfonts.com/c/629a55a7e793da068dc580d184cc0e31?family=Open+Sans" rel="stylesheet" type="text/css"/>

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

var uid;

const db = firebase.firestore();
const ref = db.collection("users");
var studentList = [];
var oldList = [];

function logOut() {
  window.location.href = "/";
}

var searchData = {
  name: "",
  gender: "",
  college: "",
  major: "",
};

async function searchName(key) {
  studentList = [];
  await ref
    .where("searchKey", "==", key)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        var uid = doc.id;
        var newdata = { uid, ...doc.data() };
        studentList.push(newdata);
        console.log(newdata);
      });
    });
  console.log("name search 3");
}
async function genderSearch(gender) {
  studentList = [];
  await ref
    .where("gender", "==", gender)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        var uid = doc.id;
        var newdata = { uid, ...doc.data() };
        studentList.push(newdata);
        console.log(newdata);
      });
    });
  console.log("gender search 3");
}
async function collegeSearch(college) {
  studentList = [];
  await ref
    .where("college", "==", college)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        var uid = doc.id;
        var newdata = { uid, ...doc.data() };
        studentList.push(newdata);
        console.log(newdata);
      });
    });
  console.log("college search 3");
}
async function majorSearch(major) {
  studentList = [];
  await ref
    .where("major", "==", major)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        var uid = doc.id;
        var newdata = { uid, ...doc.data() };
        studentList.push(newdata);
        console.log(newdata);
      });
    });
  console.log("college search 3");
}

// this is what each user card looks like
function Cardpic(dataobj) {
  var data = dataobj.cardpic;
  return (
    <div className="PictureCard">
      <img id="cardpic" src={data.photoURL} alt="hi" />
      <p id="personname"> {data.name}</p>
      <p id="bio"> {data.bio}</p>
    </div>
  );
}

// gets the user data from db
function Datalist(val, data) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (val === true) {
      setUsers(data);
    }
    const fetchData = async () => {
      await db.collection("users").onSnapshot((snapshot) => {
        studentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        oldList = studentList;
        setUsers(studentList);
      });
    };
    fetchData();
  }, []);
}
/// returns a list of card

const CardList = () => {
  Datalist();
  console.log("new stuff 2");
  return (
    <div className="profileContainer">
      {studentList.map((data) => (
        <div key={data.uid}>
          <Cardpic cardpic={data} />
        </div>
      ))}
    </div>
  );
};

function GenderPicker() {
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    const val = event.target.value;
    setValue(event.target.value);
    genderSearch(event.target.value);
    console.log(val);
  };
  return (
    <div className="genderPick">
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          className="genderPick"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
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
    collegeSearch(val);
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
        <InputLabel id="demo-controlled-open-select-label">College</InputLabel>
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
    majorSearch(val);
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
function editPage() {
  window.location.href = "/edit/" + uid;
}
/// runs the main page
export default class Main extends React.Component {
  componentDidMount() {
    uid = this.props.match.params.uid;
    console.log(uid);
  }

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      gender: "",
      start: "",
      college: "",
      major: "",
    };
  }
  updateSearch(event) {
    console.log("update 1");
    const val = event.target.value;
    this.setState({ search: val });
    if (event.target.id === "searchName") {
      searchData.name = val;
      if (searchData.name.length === 0) {
        studentList = oldList;
      }
      if (searchData.name.length === 2) {
        searchName(searchData.name);
      }
    }
  }
  updateGenderSearch(event) {
    console.log("gender 1");
    const val = event.target.value;
    this.setState({ gender: val });
    searchData.gender = val;
    genderSearch(event.target.value);
  }
  start(event) {
    console.log("gender 1");
    const val = event.target.value;
    this.setState({ start: val });
  }

  render() {
    return (
      <div className="mainScreen">
        <nav>
          <div className="logoImage">
            <img
              src="https://cdn.glitch.com/b56a20e6-825e-4fa9-afd6-163a64d6fbcc%2Fdesktopsplashpagehf-ucdyearbooklogo-01-copy-3%402x.png?v=1591205578455"
              alt="logo"
              className="logo"
            />
          </div>

          {/* dont move this  */}
          <div>
            <form noValidate autoComplete="off">
              <TextField
                size="medium"
                id="searchName"
                label="Search"
                variant="outlined"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
              />
            </form>
          </div>

          <GenderPicker />
          <Major />
          <College />
          {/* dont move this  */}

          <div className="avatar">
            <Avatar
              alt="Add"
              onClick={editPage}
              src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg"
            />
          </div>
          <Button variant="contained" color="primary" onClick={logOut}>
            log out
          </Button>
        </nav>
        <div className="advanceSearch">
          <Button
            variant="contained"
            color="secondary"
            value={this.state.start}
            onClick={this.start.bind(this)}
          >
            Advanced search
          </Button>
        </div>
        <div className="welcome">
          <p> Welcome class of 2020</p>
        </div>
        <CardList />
      </div>
    );
  }
}
