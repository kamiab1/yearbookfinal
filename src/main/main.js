import React, { useState, useEffect } from "react";
import "./main.css";
import { makeStyles, Button, Avatar } from "@material-ui/core";
import firebase from "../firebase/firebase";
// import GlobalFonts from './fonts/fonts';
//<link href="//db.onlinewebfonts.com/c/629a55a7e793da068dc580d184cc0e31?family=Open+Sans" rel="stylesheet" type="text/css"/>
var uid;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
function logOut() {}

function Nav() {
  const classes = useStyles();
  return (
    <nav>
      <img
        src="https://cdn.glitch.com/b56a20e6-825e-4fa9-afd6-163a64d6fbcc%2Fdesktopsplashpagehf-ucdyearbooklogo-01-copy-3%402x.png?v=1591205578455"
        alt="logo"
        className="logo"
      />
      <div className="search">
        <img
          src="https://cdn.glitch.com/b56a20e6-825e-4fa9-afd6-163a64d6fbcc%2Fsearch%20Copy%403x.png?v=1591342697834"
          alt="search icon"
          className="searchIcon"
        />
      </div>
      <div className={classes.root}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </div>
      <Button variant="contained" color="primary" onClick={logOut}>
        log out
      </Button>
    </nav>
  );
}

/// this is what each user card looks like
function Cardpic(dataobj) {
  var data = dataobj.cardpic;
  console.log(data.photoURL);
  return (
    <div className="PictureCard">
      <img src={data.photoURL} alt="sdsdsdsdf" />
      <p id="name"> {data.name}</p>
    </div>
  );
}

// gets the user data from db
function Datalist() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      await db.collection("users").onSnapshot((snapshot) => {
        const newUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(newUsers);
      });
    };
    fetchData();
  }, []);

  return users;
}

/// returns a list of card
const CardList = () => {
  const list = Datalist();
  return (
    <div className="profileContainer">
      {list.map((data) => (
        <div key={data.id}>
          <Cardpic cardpic={data} />
        </div>
      ))}
    </div>
  );
};

/// runs the main page
export default class Main extends React.Component {
  componentDidMount() {
    uid = this.props.match.params.uid;
    console.log(uid);
  }
  render() {
    return (
      <div className="mainScreen">
        <Nav />
        <div className="welcome">
          <p> Welcome class of 2020</p>
        </div>
        <CardList />
      </div>
    );
  }
}
