import React, { useState, useEffect } from "react";
import "./landing.css";
import firebase from "../firebase/firebase";
import { Link } from "react-router-dom";

function Nav() {
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

      <Link to="/Login" className="loginB">
        <p className="bTxt">Log in</p>
      </Link>
      <Link to="/signup" className="signupB">
        <p className="bTxt">Sign up</p>
      </Link>
    </nav>
  );
}

/// this is what each user card looks like
function Cardpic(dataobj) {
  var data = dataobj.cardpic;
  console.log(data);
  return (
    <div className="PictureCard">
      <img src="sdsdsd.png" alt="sdsdsdsdf" />
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
export default class Landing extends React.Component {
  render() {
    return (
      <div className="landing">
        <Nav />
        <div className="welcome">
          <p> Class of 2020</p>
        </div>
        <CardList />
      </div>
    );
  }
}
