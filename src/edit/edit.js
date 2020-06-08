import React, { useState, useEffect } from "react";
import "./edit.css";
// import axios from "axios";
import firebase from "../firebase/firebase";
import { Button, TextField } from "@material-ui/core";
const storageRef = firebase.storage().ref();
const db = firebase.firestore();
const ref = db.collection("users");
var on = false;
var userData = {
  name: "",
  bio: "",
  gender: "",
  college: "",
  major: "",
};
var uid;
var url =
  "https://firebasestorage.googleapis.com/v0/b/yearbook-eb32b.appspot.com/o/Screen%20Shot%202020-06-06%20at%205.07.42%20PM.png?alt=media&token=f1cc5aa1-830e-45ce-9753-4e581208c677";

function showSearchMenu() {
  console.log("Search " + on);
  if (on === false) {
    on = true;
  } else {
    on = false;
  }
}
// function goToSignUp() {
//   window.location.href = "./sign";
// }

async function saveData() {
  await ref.doc(uid).set(
    {
      bio: userData.bio,
    },
    { merge: true }
  );
  window.location.href = "/main/" + uid;
}
function goBack() {
  window.location.href = "/main/" + uid;
}

function UserResult() {
  const [user, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const val = await ref.doc(uid).get();
      const data = val.data();
      userData.bio = data.bio;
      userData.name = data.name;
      userData.college = data.college;
      userData.gender = data.gender;
      userData.major = data.major;
      console.log(data);
      setUsers(data);
    };
    fetchData();
  }, []);
  return user;
}

function Header() {
  return (
    <div className="nav">
      <div>logo</div>
      <Button variant="contained" color="primary">
        log out
      </Button>
      <Button
        className="back"
        variant="contained"
        color="secondary"
        onClick={goBack}
      >
        back
      </Button>
      {/* <div className="save" onClick={saveData}>
        <Button variant="contained" color="primary">
          back
        </Button>
      </div> */}
    </div>
  );
}
function updatebio(event) {
  const val = event.target.value;
  userData.bio = val;
}
function Info() {
  UserResult();
  return (
    <div className="Info">
      <p className="Name">{userData.name}</p>
      {/* <p className="bio" contentEditable="true">
        please add your bio right here :)
      </p> */}
      <form noValidate autoComplete="off">
        <TextField
          size="medium"
          id="searchName"
          label="add bio"
          variant="outlined"
          // value={this.state.search}
          onChange={updatebio}
        />
      </form>
      <div className="College">
        <p className="question">College</p>
        <p className="answer" id="college">
          {userData.college}
        </p>
      </div>
      <div className="Major">
        <p className="question">Major</p>
        <p className="answer" id="major">
          {userData.major}
        </p>
      </div>
      <div className="Gender">
        <p className="question">Gender</p>
        <p className="answer" id="gender">
          {userData.gender}
        </p>
      </div>
    </div>
  );
}

export default class Profile extends React.Component {
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
  state = {
    selectedFile: null,
    bio: "Update your bio here",
  };

  uploadPic = async (event) => {
    const imgage = event.target.files[0];
    const thisRef = storageRef.child(imgage.name);
    await thisRef.put(imgage).then(async function (snapshot) {
      url = await snapshot.ref.getDownloadURL();
      console.log(url);
    });
    await ref.doc(uid).set(
      {
        photoURL: url,
      },
      { merge: true }
    );

    this.setState({
      selectedFile: url,
    });
  };
  fileUpload = () => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    // axios.post("ecs160.org", fd);
  };
  saveStuff = () => {
    // axios.post("ecs160.org", fd);
  };
  render() {
    return (
      <div className="profile">
        <Header />

        <div className="card">
          <div className="picCont">
            <img className="profilePic" alt="name" src={url} />
            <div className="addpic">
              <input
                id="upload"
                type="file"
                onChange={this.uploadPic}
                ref={(fileUpload) => (this.fileUpload = fileUpload)}
              />
            </div>
          </div>
          <Info />

          <div className="save" onClick={saveData}>
            <Button variant="contained" color="secondary">
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
