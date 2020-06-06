import React from "react";
import "./profilepage.css";

var on = false;

function SearchMenu() {
  return (
    <div className="searchlist">
      <div className="College">
        <p>College</p>
        <div className="dropArrow"></div>
      </div>
      <div className="Major">
        <p>Major</p>
        <div className="dropArrow"></div>
      </div>
      <div className="Gender">
        <p>Gender</p>
        <div className="dropArrow"></div>
      </div>
    </div>
  );
}

function showSearchMenu() {
  console.log("Search " + on);
  if (on === false) {
    on = true;
  } else {
    on = false;
  }
}
function goToSignUp() {
  window.location.href = "./sign";
}

function goToMain() {
  window.location.href = "./main";
}

function goToLogIn() {
  window.location.href = "./Login";
}

function Header() {
  return (
    <h1 className="heading">
      <img
        className="logo"
        alt="name"
        src=" https://cdn.glitch.com/b56a20e6-825e-4fa9-afd6-163a64d6fbcc%2Fdesktopsplashpagehf-ucdyearbooklogo-01-copy-3%402x.png?v=1591205578455 "
      />
      <div className="search" contentEditable="true"></div>
      <img
        className="backMobile"
        alt="name"
        onClick={goToMain}
        src="https://cdn.glitch.com/b56a20e6-825e-4fa9-afd6-163a64d6fbcc%2Fhome.svg?v=1591377932064"
      />
      <img
        className="mic"
        alt="name"
        onClick={showSearchMenu}
        src="https://cdn.glitch.com/b56a20e6-825e-4fa9-afd6-163a64d6fbcc%2Fdesktopsplashpagehf-shape%402x.png?v=1591205578742"
      />
      <button className="Login" onClick={goToLogIn}>
        {" "}
        Login
      </button>
      <img
        className="loginlogo"
        alt="name"
        onClick={goToLogIn}
        src="https://cdn.glitch.com/b56a20e6-825e-4fa9-afd6-163a64d6fbcc%2Faccount.svg?v=1591313978730"
      />
      <button className="Signup" onClick={goToSignUp}>
        Signup
      </button>
    </h1>
  );
}

function GetProfile() {
  return (
    <div className="card">
      <img
        className="profilePic"
        alt="name"
        src="https://cdn.glitch.com/b56a20e6-825e-4fa9-afd6-163a64d6fbcc%2Fdesktopsplashpagehf-4151.png?v=1591205580320"
      />
      <div className="Info">
        <p className="Name">Человек</p>
        <p className="bio">I like testing</p>
        <div className="College">
          <p className="question">College</p>
          <p className="answer">No college</p>
        </div>
        <div className="Major">
          <p className="question">Major</p>
          <p className="answer">none</p>
        </div>
        <div className="Gender">
          <p className="question">Gender</p>
          <p className="answer">robot</p>
        </div>
      </div>
      <div className="back" onClick={goToMain}>
        X
      </div>
    </div>
  );
}

export default class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <Header />
        {on ? <SearchMenu /> : <div />}
        <GetProfile />
      </div>
    );
  }
}
