import React from "react";
import Sign from "../signup/signUp.js";
import Main from "../main/main";
import Profile from "../profile/profilepage.js";
import Login from "../login/LogIn.js";
import Landing from "../landing/landing.js";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/signup" component={Sign} />
          <Route path="/main/:uid" component={Main} />
          <Route path="/profilepage" component={Profile} />
          <Route path="/Login" component={Login} />
          <Route path="/landing" component={Landing} />
        </header>
      </div>
    </Router>
  );
}

export default App;
